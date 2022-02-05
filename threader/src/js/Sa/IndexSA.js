import React, { useState, useRef } from 'react'
import axios from 'axios'
import Chart from './Chart';
import { loading, loadingBubble, loadingSpinners } from '../../db/loading';

const IndexSA = ()=>{

    const [statement, setStatement] = useState('');
    const [resFromPy, setResFromPy] = useState('');
    const [seeDetails, setSeeDetails] = useState(false);
    const [analyzed, setAnalyzed] = useState(false);
    const [seeHideLabel, setSeeHideLabel] = useState(['See', 'Hide', 0]);
    

    const analyze =(e)=>{
        e.preventDefault()
        setResFromPy("Loading ... ")
        axios.post('/api/analyze', {'statement':statement}).then(res=>{
            setResFromPy(res.data)
            console.log(res.data)
        }).catch(err=>{
            console.log("ERROR HERE")
            console.log(err)
        })
        setAnalyzed(true)
    }

    return<>
    <h1>Welcome to Sentimental analysis</h1>
    <br />
    <hr />
        <form className="niceCenter form-group">
            <label>Enter the statement to analyze</label>
            <input className="form-control" type="text" onChange={
                (e)=>{
                    setStatement(e.target.value)
                }
            } />
            <hr />
            <button className="btn btn-danger" onClick={analyze} >Analyze the statement</button><hr />
        </form>
        {analyzed && <div  className="niceCenter">
            {typeof(resFromPy) === 'string' &&  <> <br />{loadingBubble()} <br /> {loading('Loading ML Model ...')} <br /> {loadingSpinners()} </>}
            {
                typeof(resFromPy) === 'object' && 
                <>
                 <div className='niceCenter'>
                    <hr />
                    <h5>The overall sentiment: {resFromPy['res']} <br /> Confidence: {resFromPy['prob']} </h5>
                    <button className='btn btn-secondary' onClick={()=>{
                        setSeeDetails(!seeDetails);
                         setSeeHideLabel(['See', 'Hide', (seeHideLabel[2]+1)%2]);}}>
                            {seeHideLabel[seeHideLabel[2]]} More Details</button>
                            <hr />
                 </div>
                    {
                        seeDetails && <>
                        <div className='niceCenter'>
                            <div  className="border border-danger shadow-lg p-3 mb-5 rounded bg-danger.bg-gradient">
                                <h5>Original Statement: {resFromPy['Statement']}
                                <br />
                                Filtered Statement: {resFromPy['FilteredStatement']}
                                </h5>
                            </div>
                        <div className=' className="border border-danger shadow-lg p-3 mb-5 rounded bg-danger.bg-gradient"'>
                            <table className='table border border-success border-left'>
                                <thead>
                                    <tr>
                                        <th>Model/Sentiment</th>
                                        {
                                            resFromPy['classes'].map(
                                                (i)=>{
                                                    return <th>
                                                            {i}
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
                                <Chart data={resFromPy}></Chart>
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