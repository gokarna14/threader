import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
// import Switch from "react-switch";
import { useState } from 'react'
import axios from 'axios'


import Homepage from './js/Homepage';
import IndexSA from './js/Sa/IndexSA';
import IndexPP from './js/pp/IndexPP';
import IndexHFG from './js/hfg/IndexHFG';


function App() {

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

  return (
    <div className="App spaceDown">
      
        <BrowserRouter>
          <Routes>
            {routeInfo}
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;