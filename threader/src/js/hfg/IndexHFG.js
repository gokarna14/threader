import React, { useEffect, useState} from 'react';
import Parallel from "../animation/Parallel";
import { spacing } from "../../db/usefuls";
import axios from 'axios'
import swal from 'sweetalert';
import SideBySide from '../template/SideBySide';
import { Parallax } from "react-parallax";

import Separator from "../template/Separator";
import TrialWords from "../animation/TrialWords";
import { loading } from '../../db/loading';

// import {Bar} from 'react-chartjs-2'
// import {ChartData} from 'chart.js'

const IndexHFG = ()=>{

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false)
    const [loadingz, setLoading] = useState(false)
    const [modelRegen, setmr] = useState(false)
    const [resz, setRes] = useState('')


    const regen=()=>{
        setLoading(true)
        axios.post('/api/saRe', {'sql':'sql'}).then(res=>{
            console.log(res)
            setLoading(false)
            setmr(true)
            setRes(res)
        }).catch(err=>{
            console.log("ERROR HERE")
            console.log(err)
        })
    }

    const sa ={
        'left':<>
            <button className='btn btn-danger'

            onClick={regen}
            
            >Regenerate Model</button>
            {/* <button className='btn btn-warning'>Download User Responses</button> */}
        </>,
        'right':<div className=''>
        <dir style={{
            textAlign: 'right'
        }}>
            <h2>Manage Sentiment Analysis</h2>

        {
            loadingz &&
                <>
                    {loading('Regenerating Model ...')}
                </>
        }

        {
            modelRegen && !loadingz &&
                <>
                    {resz.data}
                </>
        }

        </dir>
        
    </div>
    }


    const buttonClicked=(e)=>{
        e.preventDefault()

        var sql = "select 1 from admin where username='" + username +"' and password='" + password + "'"


        axios.post('/api/login', {'sql':sql}).then(res=>{
            if (res.data.length == 1){
                setLoggedIn(true)
                swal("Welcome Mr. " +  username + "!", "Login Successful", "success");
            }
            else{
                setLoggedIn(false)
                swal("Invalid Username/Password !", "Login Failed", "error");

            }
        }).catch(err=>{
            console.log("ERROR HERE")
            console.log(err)
        })

        console.log(sql)

    }
  


    return<>
    { !loggedIn &&
        <>
        <Parallel
                text={'Admin Login Portal'}
                r= {100}
                g={50}
                b={50}
                width={'100%'}
                >   
        </Parallel>
        
        {spacing}
        <TrialWords
            words={['If you are not authorized to be here, exit the page immediately.']}
        ></TrialWords>
        {spacing}
            <div>
                <div className='niceCenter'> 
                    <div className=' shadow-lg p-3 mb-5 rounded' style={{
                        textAlign: 'center'
                    }}>
                        <div class>
                            <form>
                                <div style={
                                    {
                                        textAlign: 'Right'
                                    }
                                }
                                className='niceCenter'
                                >
                                    <tr>
                                        <td>
                                            <label>Admin User Name</label>
                                        </td>
                                        <td>
                                            <h1></h1>
                                        </td>
                                        <td>
                                            <input type="text" 
                                            onChange={(e)=>{
                                                setUserName(e.target.value)
                                            }}
                                            /> <br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>Password</label>
                                        </td>
                                        <td>
                                            <h1></h1>
                                        </td>
                                        <td>
                                            <input
                                            onChange={(e)=>{
                                                setPassword(e.target.value)
                                            }}
                                            type="password" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                        <td>
                                            <h1></h1>
                                        </td>
                                            <button
                                            className='btn btn-danger'
                                            onClick={buttonClicked}
                                            >LogIn</button>
                                        </td>
                                    </tr>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
        }

{loggedIn &&
        <>
            <Parallel
                text={"Welcome " + username + " Admin !"}
                r={34}
                g={139}
                b={34}
                width={'100%'}
                speed={10}
            ></Parallel>
            <div>
                {spacing}
                {Separator}
                {spacing}
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


            </div>
            {spacing}
            {spacing}
        </>

        }

    </>
}

export default IndexHFG;