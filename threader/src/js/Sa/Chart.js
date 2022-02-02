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
            temp['Sentiment'] = dataReceived['classes'][i]
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
    <button className='leftAbs btn btn-outline-danger' onClick={buttonClicked}>Visualize this data</button>
    { showChart &&
        <div   className='right'>
        <BarChart
            width={600}
            height={300}
            data={data} 
            margin={{
                top: 5,
                right: 30,
                left: 20,
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
    </>
}
export default Chart;