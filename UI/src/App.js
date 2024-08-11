import './css/add.css'
import './css/home.css'
import './css/Trending.css'
import React, { useState, useEffect } from 'react'
import Trending from "./FrontPage/trend"
import Foot from "./FrontPage/foot"
import Home from "./FrontPage/home"
import axios from 'axios'
import $ from 'jquery';
import { useLocation, useNavigate } from 'react-router-dom';
import CheckCred from './TokenValidate';
function App() {
  let temp = CheckCred();
  const [validate, setvalidate] = useState(temp)
  useEffect(() => {
    setvalidate(temp)
  }, [temp])
  return (
    <div className="App">
      <Home />
      <Trending />
    </div>
  );
}

export default App;
