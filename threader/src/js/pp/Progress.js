// import React, { useState } from "react";
// // import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';
// import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';



// const Progress = (props)=>{

//     // const [data, setData] = useState(props.remaining)

//     // return(
//     //     <div>
//     //     <PieChart width={400} height={400}>
//     //       <Pie
//     //         dataKey="value"
//     //         isAnimationActive={false}
//     //         data={props.remaining}
//     //         cx="50%"
//     //         cy="50%"
//     //         outerRadius={80}
//     //         fill="#8884d8"
//     //         label
//     //       />
//     //       <Tooltip />
//     //     </PieChart>
//     //     </div>
//     // )
// };

// export default Progress;


import "./style.css";
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";
  const fillColor = payload.name == 'Remaining' ? "#FF0000" : "#259600"

  return (
    <g>
      <text x={cx} y={cy - (payload.name == 'Remaining' ? 10 :-10)} dy={8} textAnchor="middle" fill={fillColor}>
        {payload.name}{(payload.name == 'Remaining' ? '❌' : '✅')}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fillColor}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fillColor}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fillColor} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
      <text x={cx} y={cy-150} dy={8} textAnchor="middle" fill={fill}>Your Progress</text>
    </g>
  );
};

export default function Progress(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
      <div className="pieChart"
      data-toggle="tooltip" 
      title="Your Progress"
      >
          <div className="container">
            <button className="btn btn-outline-danger"
            data-toggle="tooltip" 
            title="Show/Hide your progress."
            onClick={()=>{
                props.setShowProgress(!props.showProgress)
            }}
            >{props.showProgress ? 'Hide' :'Show'} Progress</button>
          </div>
        {props.showProgress && 
        <>
        <hr />
            <PieChart width={500} height={400} className="pieChart">
            <Pie
                activeIndex={[0, 1]}
                activeShape={renderActiveShape}
                data={props.remaining}
                cx={250}
                cy={200}
                innerRadius={70}
                outerRadius={90}
                fill={"#8884d8"}
                dataKey="value"
                onMouseEnter={onPieEnter}
            />
            </PieChart>
        </>}
      </div>
  );
}
