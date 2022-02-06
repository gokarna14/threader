import React, {useLayoutEffect, useState } from "react";
import { to_predict } from "../../db/pp";
import { LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,  } from 'recharts';

import { loading, loadingSpinners, loadingBubble} from "../../db/loading";
import { avg } from "../../db/pp";


function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
   
    
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

const Result =(props)=>{

    const [showBar, setShowBar] = useState(true)

    const returnToQA = () =>{
        props.setShowResult(false)
        props.setAutoFill(false)
        props.setResponse({})
        props.setAutoFilledQuestion([])
    }

    const [width, height] = useWindowSize();
    const [data, setData] = useState([])
    const [showGraph, setShowGraph] = useState(false)

    const visualizeData=()=>{
        var temp = []
        for(var i in props.resFromPy){
            temp.push({ 
                "code": ('TIPI' + i),
                "name": to_predict['TIPI' + i],
                "Your score": parseInt((parseInt(props.resFromPy[i])/7)*100),
                "World Average": parseInt((avg[('TIPI' + i)])/7*100)
            })
        }
        setData(temp)
        setShowGraph(true)
        console.log(temp)
    }

    const showRes = Object.keys(props.resFromPy).map(
        (i)=>{
            return(
                <tr>
                    <td>{'TIPI' + i}</td>
                    <td>{to_predict['TIPI' + i]}</td>
                    <td>{parseInt((parseInt(props.resFromPy[i])/7)*100)}</td>
                </tr>
            )
        }
    )


    return(
        <>

        <div className="topLeftFixed">
            <button className="btn btn-danger" 
                onClick={returnToQA}
                data-toggle="tooltip" 
                title="Discards the result and goes back to question answering."
            >Return To Question Answers <Tooltip content={<>HERE</>} ></Tooltip> </button>
            <br /><hr /> 
            {Object.keys(props.resFromPy).length === 10 && 
            <button className="btn btn-primary" 
            onClick={visualizeData}
            data-toggle="tooltip" 
            title="Creates bar graph of your result."
            >Visualize data</button>}
        </div>

            <h1>
                This is your result.
            </h1>
            {typeof(props.resFromPy) == 'object' && <>
            <div className="niceCenter">
                <div className="niceCenter">
                       
                    <table className='table border border-danger shadow-lg p-3 mb-5 rounded bg-danger.bg-gradient'>
                        <thead>
                            <tr>
                                <th>CODE</th>
                                <th>FACTOR</th>
                                <th>SCORE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showRes}
                                {
                                Object.keys(props.resFromPy).length !== 10  && <>
                                    <td>{loadingBubble()}</td>
                                    <td>{loading('Loading another factor')}</td>
                                    <td>{loadingSpinners()}</td>
                                </>}
                        </tbody>
                    </table>
                    { showGraph &&
                        <div className="border border-danger shadow-lg p-3 mb-5 rounded bg-danger.bg-gradient">
                               {showBar && <>
                                    <BarChart
                                        width={window.innerWidth/2.3}
                                        height={window.innerHeight/2}
                                        data={data}
                                        margin={{
                                            top: 5,
                                            right: 10,
                                            left: 10,
                                            bottom: 5,
                                        }}
                                        >
                                        <CartesianGrid strokeDasharray="1 1" />
                                        <XAxis dataKey="name"
                                        display={false}
                                        tick={false}
                                        />
                                        <YAxis />
                                        <Tooltip label={<>HELLO</>}/>
                                        <Legend verticalAlign="top" align="center" />
                                        <Bar dataKey="Your score" legendType="star"  fill="#5500d8" />
                                        <Bar dataKey="World Average" legendType="star" fill="#82ca9d" />
                                    </BarChart>
                                </>}
                                {!showBar && <>
                                <LineChart
                                    width={window.innerWidth/2.3}
                                    height={window.innerHeight/2}
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name"  tick={false} />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend  verticalAlign="top" align="center" />
                                    <Line type="monotone" dataKey="Your score" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="World Average" stroke="#82ca9d" />
                                    </LineChart>
                                </>}
                                <button className="btn btn-outline-secondary" onClick={()=>{setShowBar(!showBar)}} >Next graph</button>
                               
                            </div>}
                </div>
            </div>
            </>}
            {!(typeof(props.resFromPy) == 'object') && <>
                 {loading('Loading the ML model...') }
            </>}
        </>
    )
}

export default Result;