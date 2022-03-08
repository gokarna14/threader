import {Link} from 'react-router-dom';
import { members } from '../db/Members';
import { links } from '../db/Routing';
import { logo, bg, ppGif, saGif, prabas, abhay, dipesh, kshitiz } from '../db/img';
import ScrollWords from './animation/ScrollWords';
import TrialWords from './animation/TrialWords';
// import Background from './../resources/img/bg.jpg'
import Picture from './animation/Picture';
import SideBySide from './template/SideBySide';
import { Parallax } from "react-parallax";
import Separator from './template/Separator';
import Parallel from './animation/Parallel';

import '../css/homepage.css'

const pictures={
    '075BEI014': prabas,
    '075BEI015': kshitiz,
    '075BEI013': dipesh,
    '075BEI003': abhay,
}

const Homepage = ()=>{

    const spacing = [1, 2, 3, 4, 5, 6].map(
        (i)=>{
            return(
                <br />
            )
        }
    ) 



    const developers = {
    'aboutUs': <div className='niceCenter'>
        <dir className='aboutUS'>
            <h2>About Us</h2>
            <p>We are undergrad students, currently a year III student under the program BE in Electronics, Communication and Information.</p>
        </dir>
        
    </div>,
    'devs': <div className='niceCenter'>
         <table className='table' style={{
             color: 'white'
         }}>
                                <tbody>
                                    <tr>
                                        <th>
                                            {abhay} 
                                            <br />
                                            Abhay Nepal
                                            <br />
                                            075BEI003
                                        </th>
                                        <th>
                                            {dipesh} 
                                            <br />
                                            Dipesh Tripati
                                            <br />
                                            075BEI013
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>
                                            {prabas} 
                                            <br />
                                            Gokarna Adhikari
                                            <br />
                                            075BEI014
                                        </th>
                                        <th>
                                            {kshitiz} 
                                            <br />
                                            Kshitiz Dhakal
                                            <br />
                                            075BEI015
                                        </th>
                                    </tr>
                                </tbody>
        </table>
    </div>
    }

    const sa ={
        'left':<>
            {saGif}
        </>,
        'right':<div className=''>
        <dir style={{
            textAlign: 'right'
        }}>
            <h2>Sentiment Analysis</h2>
            <p>We can analyze the sentiment of a english text with more than 90% accuracy !</p>
        </dir>
        
    </div>
    }

    const pp ={
        'right':<>
            {ppGif}
        </>,
        'left':<div className=''>
        <dir style={{
            textAlign: 'left'
        }}>
            <h2>Personality Prediction</h2>
            <p>We can predict human personality that is true for Quarter of the world population based on more than 70 thousands data !</p>
        </dir>
        
    </div>
    }





    return <div style={{ 
    }}>

            <Parallax
            blur={0} 
            bgImage={require("../resources/img/gif/threader.gif")} 
            bgImageAlt="the cat" 
            strength={200}

            
            >
                        {spacing}
                        {spacing}
                        <div className='niceCenter developers' 
                        style={{
                            textAlign:'left'
                        }}
                        >
                                <h1>WELCOME</h1>
                                <h1>TO</h1>
                                <h1>THREADER !</h1>                        
                        </div>
                        {spacing}
                {spacing}
            </Parallax> 

            {Separator}

            <Parallax 
                blur={4} 
                bgImage={require("../resources/img/developers.jpg")} 
                bgImageAlt="the cat" 
                strength={200}>
                {spacing}
                <div className='developers'>
                    <SideBySide
                        left={developers.devs}
                        right={developers.aboutUs}
                    ></SideBySide>
                </div>
                {spacing}
            </Parallax>

           <Parallel
                text={'The Project'}
                r= {210}
                g={43}
                b={43}
           >   
           </Parallel>
            
            <Parallax
            className='niceCenter'
                renderLayer={percentage => (
                    <div
                        style={{
                            position: 'absolute',
                            background: `rgba(0, 43, 43, ${percentage * 1000})`,
                            left: '0%',
                            top: '0%',
                            bottom: '0%',
                            width: percentage*window.scrollY*2,
                            height: percentage*1000,
                        }}
                    />
                )}
                >
                {spacing}
                <div className='developers'>
                    <SideBySide
                        left={sa.left}
                        right={sa.right}
                    ></SideBySide>
                </div>
                {spacing}
            </Parallax>
            {Separator}


            <Parallax
            className=''
                renderLayer={percentage => (
                    <div
                        style={{
                            position: 'absolute',
                            background: `rgba(0, 43, 43, ${percentage * 1000})`,
                            left: '0%',
                            top: '0%',
                            bottom: '0%',
                            width: percentage*window.scrollY*2,
                            height: percentage*1000,
                        }}
                    />
                )}
                >
                {spacing}
                <div className='developers'>
                    <SideBySide
                        left={pp.left}
                        right={pp.right}
                    ></SideBySide>
                </div>
                {spacing}
            </Parallax>


            {/* {saGif}
            {prabas}
            {kshitiz}
            {abhay}
            {dipesh} */}
    </div> 


}

export default Homepage;