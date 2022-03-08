import React from "react";
import { logo } from "../db/img";

 
const EndCredit = ()=>{
    return(
        <div  style={{
            paddingTop: '10%'
        }}>
            <div className='border border-primary shadow'>
                <div className="niceCenter" style={{textAlign: 'left'}} >
                    <b>THREADER - A ML implied perceptive emotion analyzer!</b>
                    <br />
                    <i>
                        THREADER is a project completed by Abhya, Dipesh, Gokarna and Kshitiz as the minor project
                        in the undergrad year III part II. This app can perform sentimental analysis of a text, predict your personality
                        and generate your handwriting font !
                    </i>
                </div>

                <hr />
                    <i>
                    {logo} © THREADER 2022, All Rights Reserved | Abhay | Dipesh | Gokarna | Kshitiz
                    </i>
                <hr />
            </div>
        </div>
    )
}

export default EndCredit;