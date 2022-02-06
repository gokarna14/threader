import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EndCredit from './js/EndCredit';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
// import Switch from "react-switch";
import React, { useEffect, useState } from 'react';
import NavBar from './js/NavBar';


import Homepage from './js/Homepage';
import IndexSA from './js/Sa/IndexSA';
import IndexPP from './js/pp/IndexPP';
import IndexHFG from './js/hfg/IndexHFG';


function App() {

  const [offset, setOffset] = useState(0);
  const [routing, setRouting] = useState([    // [path, component]
    ['/', <Homepage/>],
    ['/sa', <IndexSA/>],
    ['/pp', <IndexPP/>], 
    ['/hfg', <IndexHFG/>],

])

const routeInfo = routing.map(
  (i)=>{
    return <Route exact path={i[0]} element={i[1]} ></Route>
  }
)

  useEffect(() => {
    const onScroll = () => {
        setOffset(window.pageYOffset);
    }
    // clean up code
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  return (
    <div className="App spaceDown">
        <BrowserRouter>
      <NavBar></NavBar>
          <Routes>
            {routeInfo}
          </Routes>
        </BrowserRouter>

        <EndCredit></EndCredit>

    </div>
  );
}

export default App;