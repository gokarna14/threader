import React, { Component, PureComponent, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = (props)=>{

    const [dataReceived, setdataReceives] = useState(props.data)
    const [data, setData] = useState([])
    const [showChart, setShowChart] = useState(false);

      
    const buttonClicked =()=> { 
        console.log(dataReceived)
        var tempData = []
        for (var i in dataReceived['classes']){
            var temp = {}
            temp['Sentiment'] = dataReceived['classes'][i] + props.emoji[dataReceived['classes'][i]]
            temp['Combined'] = dataReceived['AVG'][i]
            temp['MNB'] = dataReceived['MNB'][i]
            temp['SVM'] = dataReceived['SVM'][i]
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
            <div className='className="border border-danger shadow-lg p-3 mb-5 rounded bg-danger.bg-gradient'>
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
                <Bar dataKey="Combined" fill="#ff0000" />
                <Bar dataKey="MNB" fill="#82ca9d" />
                <Bar dataKey="SVM" fill="#8884d8" />
            </BarChart>
        </div>}
    </div>
    </>
}
export default Chart;