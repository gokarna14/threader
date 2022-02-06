import React from 'react'
import { useState } from 'react';
import { DevSocialMedia } from '../../db/SMdata';
import './SocialMediaDropdown.css';

import { NavDropdown } from 'react-bootstrap';



const SocialMediaDropDown = ()=>{

    const [isShown, setIsShown] = useState(false);
    const [isShownDev, setIsShownDev] = useState(false);
    const [isShownMG, setIsShownMG] = useState(false);

    const mySocialMedia = DevSocialMedia.map(
        (i)=>{
            return  <>
                        <NavDropdown.Item target="_blank" href={i.url}>{i.icon} {i.label}</NavDropdown.Item>
                        <NavDropdown.Divider /> 
                    </>
        }
    )
    

    return  (
    <div>
        <NavDropdown 
            title={
                <span className="btn btn-outline-danger">Social Media Links</span>
                }
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            show={isShown}

            
        >   
             <NavDropdown 
                title={
                    <span className="btn btn-outline-danger">Mamaghar</span>
                    }
                id="nav-dropdown"
                onMouseEnter={() => setIsShownMG(true)}
                onMouseLeave={() => setIsShownMG(false)}
                show={isShownMG}
                drop="right"
            >  
                 {mySocialMedia} 
            </NavDropdown>
            <NavDropdown 
                title={
                    <span className="btn btn-outline-danger">Developer</span>
                    }
                id="nav-dropdown"
                onMouseEnter={() => setIsShownDev(true)}
                onMouseLeave={() => setIsShownDev(false)}
                show={isShownDev}
            >  
                {mySocialMedia} 
            </NavDropdown>
        </NavDropdown>
    </div>   
            )
}

export default SocialMediaDropDown;