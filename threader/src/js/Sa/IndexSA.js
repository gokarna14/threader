import React, { useState, useRef } from 'react'
import axios from 'axios'
import Chart from './Chart';
import { loading, loadingBubble, loadingSpinners } from '../../db/loading';
import Ratingc from '../Ratingc/Ratingc';
import {sentimentCode}  from '../../db/sa';
import UserResponse from './UserResponse';
import swal from 'sweetalert';



const IndexSA = ()=>{

    const [statement, setStatement] = useState('');
    const [resFromPy, setResFromPy] = useState('');
    const [seeDetails, setSeeDetails] = useState(false);
    const [analyzed, setAnalyzed] = useState(false);
    const [seeHideLabel, setSeeHideLabel] = useState(['See', 'Hide', 0]);
    const [rating, setRating] = useState(0) 
    const [ratedd, setRatedd] = useState(false) 
    const [ratingSubmitted, setRatingSubmitted] = useState(false) 
    const [badRating, setBadRating] = useState(false) 
    const [userResponse, setUserResponse] = useState(null)

    const emoji = {
        'fear' : '😨',
        'anger': '😡',
        'joy': '😁',
        'sadness': '😭',
        'surprise': '😦'
    }

    const analyze =(e)=>{
        e.preventDefault()
        setResFromPy("Loading ... ")
        axios.post('/api/analyze', {'statement':statement}).then(res=>{
            setResFromPy(res.data)
        }).catch(err=>{
            console.log("ERROR HERE")
            console.log(err)
        })
        setAnalyzed(true)
        setRatedd(false)
        setRatingSubmitted(false)
        setBadRating(false)
        setSeeDetails(false)
    }


    const rated=(rate)=>{
        setRating(rate)
        setRatedd(true)
        setBadRating(rate < 70)
        console.log(rate)
    }

    const recordRating=()=>{
        var data= {
            'RATING':rating/20,
            'STATEMENT': '"' + statement + '"',
            'STATEMENT_PREDICTED_KEY': sentimentCode[resFromPy['res']],
        }
        if (badRating){
            data['USER_RESPONSE_KEY'] = userResponse
        }
        var sql = 'INSERT INTO STATEMENT_RESPONSE ('
        for(var i in data){
            sql += i + ', ' 
        }
        sql = sql.slice(0, -2)
        sql += " ) VALUES ("
        for(var i in data){
            sql += data[i] + ', ' 
        }
        sql = sql.slice(0, -2)
        sql += " );"
        data['sql'] = sql
        
        axios.post('/api/addRating', data).then(res=>{
            // setResFromPy(res.data)
        }).catch(err=>{
            console.log("ERROR HERE")
            console.log(err)
        })
        
        setRatingSubmitted(true)
        swal("Thanks for your feedback!", "It helps us improve", "success");
    }


    return<>
    <h1>Welcome to Sentimental analysis</h1>
        <form
        title="The input characters must be between 8 and 250."
        className="niceCenter form-group">         
            <div className='shadow-lg p-3 mb-5 rounded'>
                <label>Enter the statement to analyze</label>
                <input className="form-control" 
                type="text" 
                maxLength={'400'}
                name="statement"
                placeholder="Statement here (Max characters = 400) ..."
                onChange={
                    (e)=>{
                        setStatement(e.target.value)
                        
                    }
                } />
                <hr />
                <button className="btn btn-danger"
                onClick={analyze} 
                disabled={statement.length < 8}
                >Analyze the statement</button>
            </div>
        </form>
        {analyzed && <div  className="niceCenter">
            {typeof(resFromPy) === 'string' &&  <> 
                <br />{loadingBubble()} <br />
                <br /> {loading('Loading ML Model ...')} <br />
                <br /> {loading('Generating result...')}<br />
                <br /> {loadingSpinners()} <br />
                </>}
            {
                typeof(resFromPy) === 'object' && 
                <>
                 <div className='niceCenter shadow-lg p-3 mb-5 rounded'>
                    <h6>The overall sentiment: {resFromPy['res']} {emoji[resFromPy['res'].toLowerCase()]} 
                        <br />
                        {!ratingSubmitted && <>
                            <br />
                                <hr />
                            <div className='niceCenterL'>
                                <div className='h1'>
                                    <i className='sideBySide1'>
                                        RATE THIS PREDICTION
                                    </i>
                                    <br />
                                    <br />
                                    <div className='sideBySide2'>
                                        <Ratingc 
                                            size={40}
                                            rated={rated}
                                        ></Ratingc>
                                    </div>
                                </div>
                            </div>

                            {
                                badRating &&
                                <UserResponse
                                setUserResponse={setUserResponse}
                                ></UserResponse>
                            }
                            {ratedd &&
                            <>
                                <br /><button className='btn btn-outline-success' onClick={recordRating}>Submit</button>
                            </>}
                        </>}
                    </h6>
                    <hr />
                    <button className='btn btn-secondary' onClick={()=>{
                        setSeeDetails(!seeDetails);
                         setSeeHideLabel(['See', 'Hide', (seeHideLabel[2]+1)%2]);}}>
                            {seeHideLabel[seeHideLabel[2]]} More Details</button>
                 </div>
                    {
                        seeDetails && <>
                        <div className='niceCenter'>
                            <div  className="shadow-lg p-3 mb-5 rounded" >
                                <p> 
                                    <b>Original Statement: </b>  <i>{resFromPy['Statement']}</i> 
                                        <br />
                                    <b>Statement fed into ML Model: </b>  <i>{resFromPy['FilteredStatement']}</i> 
                                        <br />
                                    <b> Confidence: </b>  <i>{resFromPy['prob']}</i> 
                                </p>
                            </div>
                        <div className='shadow-lg p-3 mb-5 rounded'>
                            <table 
                            className='table border border-success border-left'

                            >
                                <thead>
                                    <tr>
                                        <th>Model/Sentiment</th>
                                        {
                                            resFromPy['classes'].map(
                                                (i)=>{
                                                    return <th>
                                                            {i}{emoji[i]}
                                                        </th>
                                                }
                                            )
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                  {['SVM', 'MNB', 'AVG'].map(
                                      (i)=>{
                                          return <>
                                          <tr className='table-danger'>
                                              <th>{i}</th>
                                              {
                                                  resFromPy[i].map(
                                                      (i)=>{
                                                          return <td>
                                                                  {i.toFixed(6)}
                                                              </td>
                                                      }
                                                  )
                                              }
                                          </tr>
                                      </>
                                      }
                                  )}  
                                    
                                </tbody>
                            </table>
                        </div>
                            <div className="niceCenter">
                                <Chart data={resFromPy}
                                emoji={emoji}
                                ></Chart>
                            </div>
                        </div>
                    </>
                    }
                 </>
            }
        </div>}
    </>
}

export default IndexSA;