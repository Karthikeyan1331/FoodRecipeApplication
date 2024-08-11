import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import './login.css'
import SignIn from './signIn'
import './googleButton.css'
import GoogleSignUpButton from "./googleButton"
const Login = () => {
  const signInImageURL = 'https://source.unsplash.com/800x600/?burger';
  const signUpImageURL = 'https://source.unsplash.com/800x600/?pizza';
  const location = useLocation();

  // Access the data from the location state
  const data = location.state;

  const [isRegisterActive, setIsRegisterActive] = useState(data);
  const handleRegisterClick = () => {
    setIsRegisterActive(true);
  };

  const handleLoginClick = () => {
    setIsRegisterActive(false);
  };
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorClass, setErrorClass] = useState('');

  const handleChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Define character requirements
    const requirements = [
      { condition: newPassword.length < 8, message: "Password must be at least 8 characters long." },
      { condition: !/[A-Z]/.test(newPassword), message: "Password must contain at least one uppercase letter." },
      { condition: !/[a-z]/.test(newPassword), message: "Password must contain at least one lowercase letter." },
      { condition: !/\d/.test(newPassword), message: "Password must contain at least one digit." },
      { condition: !/[^A-Za-z0-9]/.test(newPassword), message: "Password must contain at least one special character." },
      // Add more requirements as needed
    ];

    // Generate error messages based on requirements
    const errorRequirement = requirements.find(req => req.condition);

    // Set error message based on the first failing requirement
    const errorMessage = errorRequirement ? errorRequirement.message : '';
    setErrorClass(errorMessage ? 'login-error-error' : 'login-error');
    setErrorMessage(errorMessage);
  };
  const sendUserCredential = () => {
    console.log({ firstName, lastName, email, password, isRegisterActive });
    setErrorMessage("")
    // Validate that all fields are filled
    if (!firstName || !lastName || !email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    else if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    else {
      // Send data to Node.js server
      fetch('/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password, isRegisterActive }),
        credentials: 'include',
      })
        .then(response => {
          if (response.ok) {

            // Handle successful response from server
            response.json().then(data => {
              if (!data.success) {
                setLoading(false);
                if (data.message === 'EmailExisted') {
                  setErrorMessage("Email address already in use. Please choose another.")
                }
                return
              }
              else {
                console.log(data.success, data.user)

                setTimeout(() => {
                  navigate('/CheckYourMail', { state: { data: true, credenUser: data.user } });
                }, 2000);
              }
            });
            // Optionally, reset form fields here
          } else {
            // Handle error response from server
            console.error('Failed to register user');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }


  const validateEmail = (email) => {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className='loginPage bg-cover h-screen'>
      {loading && (
        <div className="login-overlay">
        </div>
      )}

      <div className={`login-container ${isRegisterActive ? 'login-active' : ''}`} id="login-container">

        <div className="login-form-container login-sign-up">
          <form>
            <div className='text-[30px] topCreSign'>Create Account</div>
            <div className="login-social-icons">
              <GoogleSignUpButton />
            </div>
            <div className='text-sm my-3'>or use your email for registration</div>
            <div className='flex'>
              <input
                type="text"
                name="FirstName"
                className='mr-10'
                placeholder="FirstName"
                value={firstName}
                onChange={(e) => { setErrorMessage(''); setFirstName(e.target.value) }}

              />
              <input
                type="text"
                name="LastName"
                placeholder="LastName"
                value={lastName}
                onChange={(e) => { setErrorMessage(''); setLastName(e.target.value) }}
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => { setErrorMessage(''); setEmail(e.target.value) }}
            />
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                className={`w-full ${errorClass}`}
                onChange={(e) => {
                  handleChange(e);
                  setPassword(e.target.value);
                }}
              />
              <i
                className={`bi${showPassword ? ' bi-eye-fill' : ' bi-eye-slash-fill'
                  } text-[25px] absolute top-1/2 right-2 transform -translate-y-[15px] cursor-pointer text-gray-500`}
                onClick={handleTogglePassword}
              ></i>
            </div>
            {errorMessage &&
              <div className="text-grey-950 bg-red-500 mt-2 px-3 py-1 text-[13px] rounded-md">
                {errorMessage}
              </div>
            }

            <button type="button" onClick={sendUserCredential} disabled={loading}>
              {loading ? (
                <div className="login-loader"></div>
              ) : (
                'Sign Up'
              )}

            </button>
          </form>
        </div>
        <SignIn />

        <div className="login-toggle-container">
          <div className="login-toggle">
            <div className={`login-toggle-panel login-toggle-left`}>
              <div className='absolute text-[2.5vw] font-bold text-gray-100 z-[1] Welcome'>Welcome Back!</div>
              <img src={signInImageURL} className='w-[180vw] h-[150vw] object-cover opacity-80' alt="Burger for Sign In" />
              <button className="login-hidden1 absolute transform translate-y-[150px]" id="login" onClick={handleLoginClick}>
                Sign In
              </button>
            </div>
            <div className={`login-toggle-panel login-toggle-right`}>
              <div className='absolute text-[2.5vw] font-bold text-gray-100 z-[1] Welcome'>Welcome Back!</div>
              <img src={signUpImageURL} className='w-[180vw] h-[150vw] object-cover opacity-80' alt="Pizza for Sign Up" />
              <button className="login-hidden1 absolute transform translate-y-[150px]" id="login" onClick={handleRegisterClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
