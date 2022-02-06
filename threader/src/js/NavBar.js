import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SocialMediaDropDown from './socialMedia/SocialMediaDropdown';
import { NavTopics } from '../db/NavTopics';
import { animated, useSpring } from 'react-spring';
import ScrollWords from './animation/ScrollWords';



const NavBar = (props)=>{


    const [offset, setOffset] = useState(0);
    const [showNB, setShowNB] = useState(true);

    useEffect(() => {
        const onScroll = () => {
            setOffset(window.pageYOffset);
            if(window.scrollY < 200)
                setShowNB(true);
        }
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const styleSquare = useSpring({
        loop: true,
        from: { rotateZ: 0 }, 
        to: { rotateZ: 180 },
      })
    const styleCircle1 = useSpring({
        loop: { reverse: true },
        from: { x: 0 },
        to: { x: 230 },
    })
    const styleCircle2 = useSpring({
        loop: { reverse: true },
        from: { x: 0 },
        to: { x: -230 },
    })

    const navItems = NavTopics.map(
        (i)=>{
            return <div>
                <Link to={i.path} style={{textDecoration:'none'}}>
                    <div className={i.DSlass}>
                        <span className="font-weight-bold">{i.label}</span>
                    </div>
                </Link>
            </div>
        }
    )

    return (<div>
                <nav className="nav nav-tabs navbar navbar-expand bg ">
                    {navItems}

                    {(window.scrollY > 200) && <div className="page-item"
                    onClick={()=>{window.scrollTo(0, 0)}}
                    title="Show/Hide Navbar"
                    style={
                        {
                            position: 'fixed',
                            right: '2%',
                            top: '2%'
                        }
                    }
                    >
                        <span className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true"> Go to top ☝</span>
                        </span>
                    </div>}
                </nav>
            </div>) 
}

export default NavBar;