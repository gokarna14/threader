import React from "react";


const Questions = (props)=>{
    return(
        <>
        {!props.autoFill &&    <>
                <div class="form-check">
                    <input class="form-check-input" 
                    type="radio" name={"flexRadioDefault"} 
                    id="flexRadioDefault2" 
                    onChange={()=>{props.selected(props.i, props.j)}}/>
                    <label>
                        {props.j}
                    </label>
                </div>
            </>}
        {props.autoFill &&    <>
                <div class="form-check">
                    <input class="form-check-input" 
                    type="radio" name={"flexRadioDefault"} 
                    id="flexRadioDefault2" 
                    checked={props.options[props.j] === Math.floor((Math.random() * 4) + 1)}
                    onChange={()=>{props.selected(props.i, props.j)}}/>
                    <label>
                        {props.j}
                    </label>
                </div>
            </>}
        </>
    )
};

export default Questions;