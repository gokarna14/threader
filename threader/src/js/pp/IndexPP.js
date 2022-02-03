import React, { useState } from "react";
import Questions from "./Questions";


import { PP_questions } from "../../db/pp";

const IndexPP = ()=>{

    const [counter, setCounter] = useState(0);
    const [random, setRandom] = useState(0);

    const [questions, setQuestions] = useState(PP_questions);
    const [autoFill, setAutoFill] = useState(false);
    const [options, setOptions] = useState({
        'Disagreed': 1,
        'Partially agreed': 2,
        'Agreed': 3,
        'Strongly Agreed': 4
    })
    const [response, setResponse] = useState({})

    const selected = (question, option)=>{
        response[question] = options[option]
        setResponse({...response})
        console.log(response)
    }

    


    const questionsRender = Object.keys(questions).map(
        (i)=>{
            var r = parseInt(Math.floor(Math.random() * 4))
            return(
                <form className="border border-danger" id="open">
                    {questions[i]}
                    <div id="open">
                        {
                            Object.keys(options).map(
                                (j)=>{
                                    return(
                                        <>
                                            {autoFill &&    <>
                                                <div class="form-check">
                                                    <input class="form-check-input" 
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
                                                <div class="form-check">
                                                    <input class="form-check-input" 
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
        <button className="btn btn-primary" onClick={()=>{setAutoFill(!autoFill)}}>Auto fill</button>
        <hr />
        <form className="niceCenter alignLeft">
            {questionsRender}
        </form>
    </>
}

export default IndexPP; 