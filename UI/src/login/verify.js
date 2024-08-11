import React, { useEffect } from 'react';
import $ from 'jquery';
import { useLocation, useNavigate } from 'react-router-dom';
const VerifiedMail = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');
        if(token==null){
            navigate('/Login', { state: true })
        }
        console.log(token);

        // AJAX request using jQuery
        $.ajax({
            url: 'http://localhost:8000/api/VerifyUser', // Corrected URL
            method: 'POST',
            dataType: 'json', // Corrected data type
            data: JSON.stringify({ token }), // Stringify the data object
            contentType: 'application/json', // Specify content type for JSON data
            success: function (response) {
                console.log('Response:', response);
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                // Handle the error here
            },
        });
    }, []);
    function moveToLogin() {
        navigate('/Login', { state: false })
    }
    return (
        <div className='bg-gradient-to-r from-gray-300 to-yellow-200 items-center justify-center h-screen'>
            <div className='mx-[35vw] w-[400px] h-auto bg-white px-[1vw] py-[4vw] rounded-lg translate-y-[5vw] shadow-lg'>
                <div className="text-center text-[30px] translate-y-[-20px]">
                    Your Account is Verified
                </div>
                <div className='flex justify-center items-center'>
                    <img src='/image/tick.png' alt='Tick Symbol' className='w-[10vw] h-[10vw] object-cover' />
                </div>
                <br />
                <div className="text-[25px] font-semibold break-words mb-2">
                    Thank you for signing up!
                </div>
                <div className="break-words mb-4 text-[18px]">
                    To unlock a world of culinary delights, log in to your account and explore our extensive collection of over 6000 food varieties. From tantalizing cuisines to mouth-watering recipes, we've got something for every palate. Happy exploring!
                </div>
                <div className="flex justify-center items-center">
                    <button
                        onClick={moveToLogin}
                        className='text-white bg-blue-500 rounded-full mt-5 px-10 py-2 shadow-lg hover:bg-blue-600'>
                        Sign In
                    </button>
                </div>
            </div>

        </div>
    );
};

export default VerifiedMail;
