import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EmailVerified = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location
    const data = state && state.data;
    const user = state && state.credenUser
    const email1 = state && user.email;

    useEffect(() => {
        if (!data || !email1) {
            navigate('/Login', { state: true })
        } else if (data === true) {
            console.log("No navigate");
        }
    }, [data, navigate]);
    function reSendEmail() {
        console.log("hello")
        fetch('http://localhost:8000/api/reSendMail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user })
        })
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        console.log("hello")
                        if (!data.success) {
                            if(data.message === "Login"){
                                navigate("/Login",{status:true})
                            }
                        }
                        else {
                            console.log(data)
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
    return (
        <div className='bg-gradient-to-r from-gray-300 to-yellow-200 items-center justify-center h-screen'>
            <div className='mx-[35vw] w-[30vw] h-auto bg-white px-[1vw] py-[4vw] rounded-lg translate-y-[5vw] shadow-lg'>
                <div className="text-center text-[30px] translate-y-[-20px]">
                    Check your Email
                </div>
                <div className='flex justify-center items-center'>
                    <img src='/image/CheckUrEmail.png' alt='CheckUrEmail' className='w-[10vw] h-[10vw] object-cover' />
                </div>
                <br />
                <div className="break-words mb-4">We've sent an email to <div className='text-blue-400 cursor-pointer hover:text-blue-600 hover:underline'>{email1}</div> to verify your email address and activate your account.
                    The link in the email will expire in 24 hours.</div>
                <div className="flex justify-center items-center">
                    <button
                        onClick={reSendEmail}
                        className='text-white bg-blue-500 rounded-full px-3 py-1 shadow-lg hover:bg-blue-600'>
                        Re-send Verification code
                    </button>
                </div>
            </div>

        </div>
    );
}

export default EmailVerified;
