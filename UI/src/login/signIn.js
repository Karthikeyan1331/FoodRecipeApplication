import React, { useState, useEffect } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import "./googleButton.css"
import GoogleSignUpButton from "./googleButton"
import API_URL from '../config';
const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorClass, setErrorClass] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  axios.defaults.withCredentials = true
  const sendUserCredential = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log({ email, password });

    setErrorMessage("")
    if (!email && !password) {
      setErrorMessage("Please enter Email Id and Password")
    }
    else if (!email) {
      setErrorMessage('Please fill Email ID');
      return;
    }
    else if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    else if (!password) {
      setErrorMessage("Please fill Password");
    }
    // Send data to Node.js server
    axios.post(`${API_URL}api/UserLogin`, { email, password })
      .then((response) => {
        response = response.data
        console.log(response)
        if (response.success) {
          console.log(true, response.message)
          navigate('/')
        }
        else {
          setErrorMessage(response.message);
          console.log(response.message)
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      })

  }
  const validateEmail = (email) => {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  useEffect(() => {
    axios.post(API_URL+'ValidToken', { email, password })
      .then((response) => {
        response = response.data
        if (response.valid) {
          console.log(true, response.message)
          // navigate('/')
        }
        else {
          console.log(response)
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      })

    setEmail('');
    setPassword('');
    setErrorMessage('');
    setErrorClass('');
    setShowPassword(false);
  }, []);

  const onClickForgetPage=()=>{
    navigate("/ForgetPassword")
  }
  return (
    <div className="login-form-container login-sign-in">

      <form autoComplete="off">
        <div className='text-[30px] mb-0 topCreSign'>Sign In</div>

        <div className="login-social-icons">
          <GoogleSignUpButton />
        </div>
        <div className='text-sm my-3'>or use your email password</div>
        <input type="email"
          placeholder="Email"
          onChange={(e) => { setErrorMessage(''); setEmail(e.target.value) }}
          name='email'
          value={email}
        />

        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            className={`w-full ${errorClass}`}
            onChange={(e) => {
              setErrorMessage('');
              setPassword(e.target.value);
            }}
            name='password'
          />
          <i
            className={`bi${showPassword ? ' bi-eye-fill' : ' bi-eye-slash-fill'
              } text-[25px] absolute top-1/2 right-2 transform -translate-y-[15px] cursor-pointer text-gray-500`}
            onClick={handleTogglePassword}
          ></i>
        </div>

        <a href="/forgot-password"
        onClick={onClickForgetPage}
          className='text-[12px] text-blue-500 font-bold ml-[11vw] my-[.5vw] hover:underline'>
          Forget Your Password?</a>
        {errorMessage &&
          <div className="text-grey-950 bg-red-500 mt-2 px-3 py-1 text-[13px] rounded-md">
            {errorMessage}
          </div>
        }
        <button onClick={sendUserCredential}>Sign In</button>
      </form>
    </div>
  )
}

export default SignIn