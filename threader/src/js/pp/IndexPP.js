import React, { useState } from "react";
import Progress from "./Progress";
import Buttons from "./Buttons";
import Result from "./Result";
import Parallel from "../animation/Parallel";
import axios from 'axios'
import Separator from "../template/Separator";


import { PP_questions } from "../../db/pp";


const IndexPP = ()=>{

    const [showProgress, setShowProgress] = useState(true);
    const [resFromPy, setResFromPy] = useState('');
    const [latestCode, setLatestCode] = useState('')

    const [showResult, setShowResult] = useState(false);

    const [questions, setQuestions] = useState(PP_questions);
    const [autoFill, setAutoFill] = useState(false);
    const [autoFilledQuestion, setAutoFilledQuestion] = useState([]);
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

    const updateRemaining=()=>{
        remaining[0].value = 42 - Object.keys(response).length
        remaining[1].value = Object.keys(response).length
        setRemainingResponse([
            remaining[0],
            remaining[1]
        ])
    }

    const selected = (question, option)=>{
        response[question] = options[option]
        setResponse({...response})
        
        const index = autoFilledQuestion.indexOf(question);
        if (index > -1) {
            autoFilledQuestion.splice(index, 1); // 2nd parameter means remove one item only
        }
        
        setAutoFilledQuestion(autoFilledQuestion)
        updateRemaining()
    }
    
    const autoFillSelected=()=>{
        setAutoFill(!autoFill)
        if(!autoFill){
            var questionKeys = Object.keys(questions)
            for (var i in questionKeys){
                var key = questionKeys[i]
                var answers = response[key]
                var answered = (answers !== undefined)
                if (!answered){
                    response[key] = parseInt(Math.floor(Math.random() * 4) + 1)
                    autoFilledQuestion.push(key)
                    setAutoFilledQuestion(autoFilledQuestion)
                    // console.log(autoFilledQuestion)
                }
            }
        }
        else{
            for (var i in autoFilledQuestion){
                delete response[autoFilledQuestion[i]]
            }
            setResponse(response)
            setAutoFilledQuestion([])
        }
        updateRemaining()
        // console.log(response)
    }

    const submitted=()=>{
        if (Object.keys(response).length == 42){
            var listOfResponse = []
            for (var i in response){
                listOfResponse.push(response[i])
            }
        var temp = {}
        for (var i=1; i<11; i++)   { 
            setResFromPy( toString(i))
            axios.post('/api/pp', {'response':listOfResponse, 'code': i}).then(res=>{
                var response = res.data
                // console.log(res)
                temp[response['CODE']] = response['RESULT']
                setResFromPy(temp)
                setLatestCode( response['CODE'])
                }).catch(err=>{
                    console.log("ERROR HERE")
                    console.log(err)
                }) 
            }
        }
        else{
            
        }
    }


    const questionsRender = Object.keys(questions).map(
        (i)=>{
            var r = parseInt(Math.floor(Math.random() * 4))
            return(
                <form className="border border-primary" id="open">
                    <span
                        dataToo
                        title="✅😍-> Answered & ❌😅 -> Not Answered"
                    >
                        {questions[i]}  {Object.keys(response).length > 0 && (response[i] === undefined ? '❌😅' : '✅😍')}
                    </span>
                    
                    {autoFilledQuestion.includes(i) ? '(AutoFilled)' : ""}
                    <div id="open">
                        {
                            Object.keys(options).map(
                                (j)=>{
                                    var aFill = autoFill &&  response[i] === undefined
                                    return(
                                        <>
                                            {aFill &&  <>
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
                                            {!aFill &&    <>
                                                <div className="form-check">
                                                    <input className="form-check-input" 
                                                    type="radio" name={"flexRadioDefault"} 
                                                    id="flexRadioDefault2" 
                                                    checked = {response[i] == options[j]}
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
            {!showResult && <>
                <Parallel
                    text={'Welcome to Personality Prediction'}
                    r= {100}
                    g={100}
                    b={50}
                    width={'100%'}
                >   
                </Parallel>
                <br />
                <hr />
                <h2>Please answer the following questions:</h2>
                {
                    Object.keys(response).length > 0 &&
                    <div>
                        <Progress showProgress={showProgress} setShowProgress={setShowProgress} remaining={remaining}></Progress>
                    </div>
                }
                    <Buttons 
                        autoFillSelected = {autoFillSelected}
                        autoFill ={autoFill}
                        submitted = {submitted}
                        response = {response}
                        submit = {Object.keys(response).length == 42}
                        setShowResult = {setShowResult}
                    ></Buttons>
                <hr />
                <form className="niceCenter alignLeft" >
                    <div className={(Object.keys(response).length > 0) && showProgress ? "niceCenterR" : ""}>
                        {questionsRender}
                    </div>
                </form>
            </>}
            {showResult &&
                <Result
                    setShowResult = {setShowResult}
                    setAutoFill = {setAutoFill}
                    setResponse = {setResponse}
                    resFromPy = {resFromPy}
                    latestCode = {latestCode}
                    setAutoFilledQuestion = {setAutoFilledQuestion}
                ></Result>
            }
    </>
}

export default IndexPP; 