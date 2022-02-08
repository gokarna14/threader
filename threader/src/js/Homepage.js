import {Link} from 'react-router-dom';
import { members } from '../db/Members';
import { links } from '../db/Routing';
import { logo } from '../db/img';
import ScrollWords from './animation/ScrollWords';
import TrialWords from './animation/TrialWords';

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

    return <div>
        <br />
        <div className='welcomeToTR'>
            <div className='shadow-lg p-3 mb-5 rounded'>
                <ScrollWords
                    words={["Welcome", "to", "THREADER", logo]}
                    height = {125}
                    width = {'100%'}
                    textSep={40}
                ></ScrollWords>
            </div>
        </div>
    <div className='niceCenter' >
        <div className='shadow-lg p-3 mb-5 rounded'>
            <h3>Developers</h3>
            <hr />
            <div className=' h1' >
                <div className='h2'>
                    <div className='sideBySide1'>
                        <table className='table border border-success border-left' style={{
                        fontSize:'15px'
                    }}>
                            <thead >
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
                    <div className='sideBySide2' style={{
                        fontSize:'15px'
                    }}>
                        <TrialWords
                        words={["SENTIMENT ANALYSIS  😣😡", "PERSONALITY PREDICTION", "HANDWRITING FONT GENERATION"]}
                        textSep = {50}
                        ></TrialWords>
                    </div>
                </div>
            </div>
        </div>
    </div>



        </div>   
}

export default Homepage;