import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import CheckCred from '../TokenValidate';
import axios from 'axios'
const Home = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false)
  function generateSrcSet(originalUrl) {
    // Split the URL at the '=s' part to extract the base URL
    const [baseUrl] = originalUrl.split('=s');
    // Generate the 1x and 2x versions of the image URL
    const src1x = `${baseUrl}=s96-c`;
    const src2x = `${baseUrl}=s192-c`;
    // Combine the URLs with '1x' and '2x' into the srcSet format
    const srcSet = `${src1x} 1x, ${src2x} 2x`;
    return srcSet;
  }
  const handleClick = (bool) => {
    navigate('/Login', { state: bool });
  };
  const onClickSearch = (e) => {
    navigate('/' + e)
  }
  let temp = CheckCred();
  const [validate, setvalidate] = useState(temp)
  const [profilePic, setProfilePic] = useState(null)
  useEffect(() => {
    setvalidate(temp)
    if (temp) {
      setAdmin(temp?.admin)
      localStorage.setItem("useData", JSON.stringify(temp))

      setProfilePic(temp.picture)
    }
  }, [temp])
  const handleLogout = async () => {

    try {
      // Send a POST request to your backend logout endpoint
      const response = await axios.post('/logout');
      if (response.status === 200) {

        localStorage.removeItem('auth_code');
        localStorage.removeItem('useData')
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
  return (
    <div className='HomePage'>
      <div className='TopS'>
        <img className="logo rounded-full border-2" src="/image/logo.jpg" alt='hi'></img>
        <div className='NavBar'>
          <div>Home</div>
          <div onClick={() => onClickSearch("Search")}>Search</div>
          {
            validate && (
              <>
                <div onClick={() => onClickSearch("History")}>History</div>
                <div onClick={() => onClickSearch("Create")}>Create</div>
                <div onClick={() => onClickSearch("Profile")}>Profile</div>
              </>
            )
          }
          {admin && <div onClick={() => onClickSearch("AdminFoodReport")}>Report</div>}
        </div>
        {!validate ? (
          <>
            <div onClick={() => { handleClick(false) }} className='SignIn'>SIGN IN
              <i className="bi bi-box-arrow-in-right"></i></div>
            <div onClick={() => { handleClick(true) }} className='SignUp'>SIGN UP</div></>
        ) : (<div className='ml-[22vw] flex'>
          <div onClick={handleLogout} className='rounded-lg font-bold cursor-pointer text-white 
          bg-red-500 px-[1.1vw] py-[1vw] text-[1vw] transition-all hover:bg-red-600'>
            LOG OUT<i className="bi bi-box-arrow-in-right"></i></div>
        </div>)}
      </div>

      <div className='LeftS'>
        <div className='About'>Savor Every Moment, Taste Every Bite</div>
        <div className='Cook'>Let'S Cook!</div>
        <div className='des'>Explore 6000+ Delicious Recipes Today</div>
        <div className="ButtonS" onClick={() => onClickSearch("Search")}>Search</div>
      </div>
      <div className='RightS'>

        <img className='san' src='/image/Food1.png' alt=''></img>

        <div className='Ron6'></div>
        <div className='Ron1'></div>
        <div className='Ron2'></div>
        <div className='Ron3'></div>
        <div className='Ron4'></div>
        <div className='Ron5'></div>
        <img className='san1' src='/image/Noodles.png' alt=''></img>
        <img className='san2' src='/image/taco.png' alt=''></img>
        <img className='san3' src='/image/Cup.png' alt=''></img>
      </div>
    </div>
  )
}

export default Home