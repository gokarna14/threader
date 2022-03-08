import {Link} from 'react-router-dom';
import { members } from '../db/Members';
import { links } from '../db/Routing';
import { logo, bg, saGif } from '../db/img';
import ScrollWords from './animation/ScrollWords';
import TrialWords from './animation/TrialWords';
import Background from './../resources/img/bg.jpg'
import Picture from './animation/Picture';

import SideBySide from './template/SideBySide';


import '../css/homepage.css'

const Homepage = ()=>{

    const mem = members.map( 
        (i)=>{
            return <tr>
                    <td>
                        {i['name']}
                    </td>
                    <td>
                        {i['roll']}
                    </td>
            </tr>
        }
    )

    const linksRender = links.map(
        (i)=>{
            return(
                <span className='list-group-item'>
                    <Link to={i['link']}>{i['label']}</Link>
                </span>
            )
        }
    ) 


    return <div style={{ 
    }}>
        {/* <Picture></Picture> */}
        {saGif}

        <br /> 
        <div className='niceCenter' >
            <div className='shadow-lg p-3 mb-5 rounded'>
                <hr />

                <ScrollWords
                        words={["Welcome", "to", "THREADER",  logo]}
                        height = {125}
                        width = {'100%'}
                        textSep={40}
                ></ScrollWords>


                {/* <div className= 'h1' >
                    <div className='h2'>
                        <div className='sideBySide1'>
                        <ScrollWords
                        words={["Welcome", "to", "THREADER", logo]}
                        height = {125}
                        width = {'100%'}
                        textSep={40}
                    ></ScrollWords>
                        </div>
                        <div className='sideBySide2' style={{
                            fontSize:'15px'
                        }}>
                            <TrialWords
                            words={["SENTIMENT ANALYSIS  😦😭😁😣😡", "PERSONALITY PREDICTION", "HANDWRITING FONT GENERATION"]}
                            textSep = {50}
                            ></TrialWords>
                        </div>
                    </div>
                </div> */}
            </div>
            <SideBySide></SideBySide>
        </div>
        <div className='welcomeToTR'>
            <div className='shadow-lg p-3 mb-5 rounded'>
            <h3>Who we are</h3>
               <table className='table border border-success border-left' style={{
                        fontSize:'15px'
                    }}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Roll Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mem}
                            </tbody>
                        </table>
            </div>
        </div> 
   



        </div>   
}

export default Homepage;