import React, { useState } from 'react'
import axios from 'axios'


const IndexSA = ()=>{

    const [statement, setStatement] = useState('');
    const [resFromPy, setResFromPy] = useState('');


    const analyze =(e)=>{
        e.preventDefault()
        setResFromPy("Loading ML Model...")
        axios.post('/api/analyze', {'statement':statement}).then(res=>{
            setResFromPy(res.data)
            console.log(typeof(res.data))
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
        <div className='niceCenter'>
            <table className='table border border-success border-left'>
                <thead>
                    <tr>
                        {saResult}
                    </tr>
                </thead>
                <tbody>
                    {saResult}
                </tbody>
            </table>
        </div>
    </>
}

export default IndexSA;