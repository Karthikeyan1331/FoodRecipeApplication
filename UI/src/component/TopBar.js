
import '../login/sear.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CheckCred from '../TokenValidate';
const TopBar = () => {

  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false)
  const topNavData = (data) => {
    switch (data) {
      case 'Home':
        navigate("/");
        break;
      case 'Search':
        navigate("/Search");
        break;
      case 'History':
        navigate("/History");
        break;
      case 'Create':
        navigate("/Create");
        break;
      case 'Profile':
        navigate("/Profile");
        break;
      case 'AdminFoodReport':
        navigate("/AdminFoodReport");
        break;
      default:
        // Handle other cases if needed
        break;
    }
  };
  let temp = CheckCred();
  const [validate, setvalidate] = useState(temp)
  const [profilePic, setProfilePic] = useState(null)
  useEffect(() => {
    setvalidate(temp)
    setAdmin(temp?.admin)
    if (temp) {
      localStorage.setItem("useData", JSON.stringify(temp))

      setProfilePic(temp.profile)
    }
  }, [temp])
  const handleLogout = async () => {
    localStorage.removeItem("auth_code")
    localStorage.removeItem("useData")
    try {
      // Send a POST request to your backend logout endpoint
      const response = await axios.post('http://localhost:8000/logout');
      if (response.status === 200) {
        // Redirect to login page or perform any other action after successful logout
        window.location.reload() // Redirect to login page
      } else {
        // Handle logout failure
        console.error('Logout failed:', response.data);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
  const handleClick = (bool) => {
    navigate('/Login', { state: bool });
  };
  return (
    <div>
      <section id="SearchPhead">
        <div className="SearchPheadings mt-[1vw] mb-[1vw]">
          <img className='w-[60px] h-[60px] rounded-full mr-20 transform translate-y-[-10px]  border-2 border-gray-900'
            src="/image/logo.jpg"
            alt="Logo" />
          <h1 className='TopNavData' onClick={() => topNavData('Home')}>Home</h1>
          <h1 className='TopNavData' onClick={() => topNavData('Search')}>Search</h1>
          {validate && (<>
            <h1 className='TopNavData' onClick={() => topNavData('History')}>History</h1>
            <h1 className='TopNavData' onClick={() => topNavData('Create')}>Create</h1></>)}
          {admin && <h1 className='TopNavData' onClick={() => topNavData('AdminFoodReport')}>Report</h1>}
        </div>

        <div className="SearchPsign mt-[1vw] mb-[1vw] py-1 mr-5">
          {validate ? (
            <div className='ml-[50px] flex'>
              <div onClick={handleLogout} className='rounded-lg font-bold cursor-pointer text-white bg-red-500 px-[12px] py-[10px] transition-all hover:bg-red-600'>
                LOG OUT</div>
              <div className='ml-5'>
                <img src={profilePic !== null ? profilePic : 'img/slider-01.png'}
                  onClick={() => topNavData('Profile')}
                  id="profilePic"
                  alt='' className='border-2 border-black shadow-lg cursor-pointer w-[50px] h-[50px] rounded-full' />
              </div>
            </div>

          ) : (
            <div className='mr-10 flex mb-10'>
              <div className='px-[1vw] py-[1vw] cursor-pointer' onClick={() => { handleClick(false) }}>SIGN IN</div>
              <div className='bg-blue-500 ml-[.5vw] px-[1.5vw] cursor-pointer py-[1vw] 
              rounded-lg text-gray-50'
                onClick={() => { handleClick(true) }}>SIGN UP</div>
            </div>
          )}
        </div>

      </section>
    </div>
  )
}

export default TopBar