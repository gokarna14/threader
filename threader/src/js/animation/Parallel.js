import React from "react";
import { Parallax } from "react-parallax";
import { spacing } from "../../db/usefuls";


const Parallel =(props)=>{

    return(
        <>
             <Parallax 
                renderLayer={percentage => (
                    <div
                        style={{
                            position: 'absolute',
                            background: `rgba(${props.r}, ${props.g}, ${props.b}, ${percentage * 1000})`,
                            left: '0%',
                            top: '0%',
                            bottom: '0%',
                            width: (props.width == undefined ? percentage*window.scrollY*2 : window.innerWidth - percentage*window.scrollY*2),
                            height: percentage*1000,
                        }}
                    />
                )}
                >
                    <br /><br />
                    <h1 style={{
                        color:'white'
                    }}>{props.text}</h1>
                    {spacing}
            </Parallax>
        </>
    )

}

export default Parallel;