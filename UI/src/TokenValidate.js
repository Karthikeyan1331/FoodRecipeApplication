import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TokenValidation = () => {
  const navigate = useNavigate();
  const [tokenVariable, setTokenVariable] = useState(null)
  axios.defaults.withCredentials = true
  useEffect(() => {
    axios.post('/ValidToken')
      .then((response) => {
        response = response.data;
        console.log(response);
        if (response.valid) {
          if (response.message.tokenD) {
            localStorage.setItem("auth_code", response.message.tokenD)
          }
          setTokenVariable(response.message)
        } else {
          if (!("auth_code" in localStorage)) {
            setTokenVariable(false)
            console.log(response.message);
          }
          else {
            if ("useData" in localStorage)
              setTokenVariable(JSON.parse(localStorage.getItem("useData")))
            
          }
        }
      });
  }, []);
  return tokenVariable;

};

export default TokenValidation;