import React, {useLayoutEffect, useState } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


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



const Chart = (props)=>{

    const [dataReceived, setdataReceives] = useState(props.data)
    const [data, setData] = useState([])
    const [showChart, setShowChart] = useState(false);
    const [width, height] = useWindowSize();
    const [showAll, setShowAll] = useState(true);

      
    const buttonClicked =()=> { 
        var tempData = [] 
        for (var i in dataReceived['classes']){
            var temp = {}
            temp['Sentiment'] = dataReceived['classes'][i] + props.emoji[dataReceived['classes'][i]]
            temp['Combined'] = dataReceived['AVG'][i]
            if (showAll){
                temp['MNB'] = dataReceived['MNB'][i]
                temp['SVM'] = dataReceived['SVM'][i]
            }
            tempData.push(temp)
        }
        // console.log(tempData)

        setData(tempData)
        setShowChart(!showChart)
    }

    return<>
    <div>
        <button className='btn btn-outline-danger' onClick={buttonClicked}>Visualize this data</button>
        <hr />
        { showChart &&
            <div className="shadow-lg p-3 mb-5 rounded">
            <BarChart
                width={window.innerWidth/3.2}
                height={window.innerHeight/2}
                data={data} 
                margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="Sentiment" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                dataKey="Combined" 
                fill="#82ca9d"
                 name={showAll ? "Combined" : "Prediction Probability"} />
                {showAll && 
                <>
                    <Bar dataKey="MNB" fill="#6611ff" />
                    <Bar dataKey="SVM" fill="#ff0055" />
                </>
                }
            </BarChart>
            <br /><hr />
            <button
            className="btn btn-outline-danger"
            onClick={()=>{setShowAll(!showAll)}}>{showAll ? 'Hide' :'Show'} individual Model result</button>
        </div>}
    </div>
    </>
}
export default Chart;