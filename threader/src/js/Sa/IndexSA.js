import React, { useState, useRef } from 'react'
import axios from 'axios'
import Chart from './Chart';

const IndexSA = ()=>{

    const [statement, setStatement] = useState('');
    const [resFromPy, setResFromPy] = useState('');
    const [seeDetails, setSeeDetails] = useState(false);
    const [seeHideLabel, setSeeHideLabel] = useState(['See', 'Hide', 0]);
    

    const analyze =(e)=>{
        e.preventDefault()
        setResFromPy("Loading ML Model...")
        axios.post('/api/analyze', {'statement':statement}).then(res=>{
            setResFromPy(res.data)

        }).catch(err=>{
            console.log("ERROR HERE")
            console.log(err)
        })
    }

    const saResult = (typeof(resFromPy) === 'object' ?  Object.keys(resFromPy) : [resFromPy]).map(
        (i)=>{
            return <>
                {typeof(resFromPy) === 'string' &&  resFromPy}
                {
                    typeof(resFromPy) === 'object' &&  
                    <th>
                        {i}
                    </th>
                }
            </>
        }
    )


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
            <button className="btn btn-danger" onClick={analyze} >Analyze the statement</button>
        </form>
        <div>
            {typeof(resFromPy) === 'string' &&  resFromPy}
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
                        <div>
                        <div className='left'>
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
                                <Chart data={resFromPy}></Chart>
                        </div>
                    </>
                    }
                 </>
            }
        </div>
    </>
}

export default IndexSA;