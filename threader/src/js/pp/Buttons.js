import React, { useState } from "react";

const Buttons =(props)=>{

    const [sure, setSure] = useState(false)



    return(
        <>
            { !sure && <>
                <div className="topRightFixedButton">
                    <button 
                    type="button" 
                    className="btn btn-outline-success"
                    onClick={props.autoFillSelected}
                    // title="Automatically fill ups the form"
                    dataBsToggle="tooltip" 
                    dataBsPlacement="top" 
                    title="Automatically fills up the form"
                    > {props.autoFill ? 'Cancel' : ''} Auto fill</button> <br /><hr />
                    
                    <button className="btn btn-outline-danger" 
                    onClick={()=>{setSure(props.submit)}}
                    title="You cannot submit unless you answer all the questions"
                    >
                        <span class={props.submit ? "":"text-decoration-line-through"}> Submit</span> 
                    </button><br />
                </div>
            </>}
                
                {sure &&
                <div className="middleFixed border border-danger shadow-lg p-3 mb-5 rounded bg-danger.bg-gradient">
                    <h3>Are certain to submit?</h3><br />
                    <button className="btn btn-danger" onClick={()=>{
                        props.submitted();
                        setSure(false);
                        props.setShowResult(true)
                        }}>YES</button>

                    <button className="btn btn-primary" onClick={()=>{setSure(false)}}>DISCARD</button>
                </div>
                }
        </>
    )
}

export default Buttons;