import React, { useState } from "react";
import Progress from "./Progress";


import { PP_questions } from "../../db/pp";

const IndexPP = ()=>{

    const [counter, setCounter] = useState(0);
    const [showProgress, setShowProgress] = useState(false);

    const [questions, setQuestions] = useState(PP_questions);
    const [autoFill, setAutoFill] = useState(false);
    const [options, setOptions] = useState({
        'Disagreed': 1,
        'Partially agreed': 2,
        'Agreed': 3,
        'Strongly Agreed': 4
    })
    const [response, setResponse] = useState({})
    const [remaining, setRemainingResponse] = useState([
        {name: 'Remaining', value: 42},
        {name: 'Answered', value: 0},
    ]);

    const selected = (question, option)=>{
        response[question] = options[option]
        setResponse({...response})
        console.log(response)
        remaining[0].value = 42 - Object.keys(response).length
        remaining[1].value = Object.keys(response).length
        setRemainingResponse([
            remaining[0],
            remaining[1]
        ])
        console.log(remaining)
    }
 

    const questionsRender = Object.keys(questions).map(
        (i)=>{
            var r = parseInt(Math.floor(Math.random() * 4))
            return(
                <form className="border border-danger" id="open">
                    {questions[i]}  {(response[i] === undefined ? '❌😅' : '✅😍')}
                    <div id="open">
                        {
                            Object.keys(options).map(
                                (j)=>{
                                    return(
                                        <>
                                            {autoFill &&    <>
                                                <div className="form-check">
                                                    <input className="form-check-input" 
                                                    type="radio" name={"flexRadioDefault"} 
                                                    id="flexRadioDefault2" 
                                                    checked={parseInt(options[j]%4) == r}
                                                    onChange={()=>{selected(i, j)}}
                                                    />
                                                    <label>
                                                        {j}
                                                    </label>
                                                </div>
                                            </>}
                                            {!autoFill &&    <>
                                                <div className="form-check">
                                                    <input className="form-check-input" 
                                                    type="radio" name={"flexRadioDefault"} 
                                                    id="flexRadioDefault2" 
                                                    onChange={()=>{selected(i, j)}}/>
                                                    <label>
                                                        {j}
                                                    </label>
                                                </div>
                                            </>}
                                        </>
                                    )
                                }
                            )
                        }
                    </div>
                    <br />
                </form>
            )
        }
    )

    return<>
        <h1>Please answer the following questions:</h1>
        {
            Object.keys(response).length > 0 &&
            <div>
                <Progress showProgress={showProgress} setShowProgress={setShowProgress} remaining={remaining}></Progress>
            </div>
        }
        <button className="btn btn-primary" onClick={()=>{setAutoFill(!autoFill)}}>Auto fill</button>
        <hr />
        <form className="niceCenter alignLeft" >
            <div className={(Object.keys(response).length > 0) && showProgress ? "niceCenterR" : ""}>
                {questionsRender}
            </div>
        </form>
    </>
}

export default IndexPP; 