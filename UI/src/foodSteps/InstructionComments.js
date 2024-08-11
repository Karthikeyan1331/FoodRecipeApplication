import React, { useState, useEffect, useCallback } from 'react'
import API_URL from '../config';
import axios from 'axios'

const InstructionComments = ({ id }) => {
  const [commentNumber, setCommentNumber] = useState(1234);
  const [formattedNumber, setFormattedNumber] = useState('');
  const [comment, setComment] = useState('');
  const [focusOnComment, setFocusOnComment] = useState(false)
  const [dataValue, setData] = useState([])
  const [userLiked, setUserLiked] = useState('')
  let temp = 'auth_code' in localStorage
  const [validate, setvalidate] = useState(temp)


  const handleInputChange = (event) => {
    setFocusOnComment(true)
    setComment(event.target.value);
  };
  // Function to format the number to International Numeration
  const formatToInternationalNumeration = (number) => {
    return number.toLocaleString('en-US');
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("hello", id)
        const response = await axios.post(`${API_URL}api/InstructionsComments`,
          { id },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('auth_code')}`,
            },
          })
        console.log(response.data.data[0])
        setData(response.data.data[0]);
        setUserLiked(response.data.data[1])
        // Handle the response from the backend as needed
      } catch (error) {
        console.error('Error fetching data from the backend:', error.message);
        // Handle errors if needed
      }
    };
    if (id && id !== null && temp){
      setProfilePic(JSON.parse(localStorage.getItem("useData"))['profile'])
      fetchData();}
  }, [id, temp]);

  const [profilePic, setProfilePic] = useState(null);
  

  // Example usage
  const handleButtonCancel = useCallback(() => {
    // Change the comment number to trigger the useEffect
    if (comment === '')
      setFocusOnComment(false)
  }, [comment]);
  if (document.getElementById("profilePic")) {
    console.log(document.getElementById("profilePic"))
  }

  async function handleOnSubmitComment() {
    if (temp) {
      try {

        console.log("hello", id)
        const response = await axios.post(`${API_URL}api/InsertComments`,
          { id: id, comments: comment },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('auth_code')}`,
            },
          })
        // Handle the response from the backend as needed
        setComment('')
        setFocusOnComment(false)

        if (response.status === 200) {
          setData(response.data.data[0]);
          setUserLiked(response.data.data[1])

        }
        else {
          console.log(response.data.message)
        }
      } catch (error) {
        console.error('Error fetching data from the backend:', error.message);
        // Handle errors if needed
      }
    }
  }
  function timeStrapConvertion(timestamp) {
    const dateObject = new Date(timestamp);
    const formattedTime = dateObject.toLocaleString(); // Converts the date object to a localized string format
    const currentTime = new Date();
    const commentTime = new Date(formattedTime);
    const timeDifference = currentTime.getTime() - commentTime.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);

    if (secondsDifference < 60) {
      return `${secondsDifference} seconds ago`;
    } else if (secondsDifference < 3600) {
      const minutesDifference = Math.floor(secondsDifference / 60);
      return `${minutesDifference} minutes ago`;
    } else if (secondsDifference < 86400) {
      const hoursDifference = Math.floor(secondsDifference / 3600);
      return `${hoursDifference} hours ago`;
    } else if (secondsDifference < 2592000) { // One month: 30 days * 24 hours * 3600 seconds
      const daysDifference = Math.floor(secondsDifference / 86400);
      return `${daysDifference} days ago`;
    } else if (secondsDifference < 31536000) { // One year: 365 days * 24 hours * 3600 seconds
      const monthsDifference = Math.floor(secondsDifference / 2592000);
      return `${monthsDifference} months ago`;
    } else {
      const yearsDifference = Math.floor(secondsDifference / 31536000);
      return `${yearsDifference} years ago`;
    }
  }
  return (
    <div className='Recipe'>
      <div className='flex font-bold'>
        <div className='Number mr-1'>{formattedNumber}</div>
        <div className='CommentsHead'>Comments</div>
      </div>
      <div className='InputArea my-3 mx-1'>
        <div className='flex'>
          <img src={profilePic ? profilePic : 'img/slider-01.png'} alt=''
            id="pictureComment"
            className='border-2 shadow-sm   cursor-pointer w-[40px] h-[40px] rounded-full'></img>
          <input
            type="text"
            placeholder='Add your comment...'
            value={comment}
            onChange={handleInputChange}
            className='w-[50vw] ml-2 commentInputField text-[15px]'
          />
        </div>
        {focusOnComment && (<div className='flex ml-[50px] mt-2'>
          <div>
            <i className="bi bi-emoji-smile text-[20px]" ></i>
          </div>
          <div className='ml-[33vw] flex'>
            <button className='mr-3 text-[1vw] px-[1vw] py-2 rounded-full hover:bg-gray-200' onClick={handleButtonCancel}>Cancel</button>
            <button
              onClick={handleOnSubmitComment}
              className='bg-blue-600 text-[1vw] rounded-full px-[1vw] py-2 text-gray-50 font-bold 
            hover:bg-blue-700'>
              Comment</button>
          </div>
        </div>)}
      </div>
      <div className='otherComments '>
        {dataValue && dataValue.length > 0 && dataValue.map((valComments, index) => (
          <div key={index} className='UserComments'>
            <div className='float-left'>
              <img src={valComments['profile'] ? valComments['profile'] : 'img/slider-01.png'} alt=''
                className='border-2 shadow-sm cursor-pointer w-[38px] h-[38px] rounded-full'></img>
            </div>
            <div className='flex'>
              <div className='ml-2 text-[12px] font-bold'>{valComments['User_email_id']}</div>
              <div className='ml-3 text-[12px] text-gray-500'>{timeStrapConvertion(valComments['created_date'])}</div>
            </div>
            <div className='flex mt-1'>
              <div className='ml-2 text-[12px]'>
                {valComments['Food_Comment']}
              </div>
            </div>
            <div className='mt-2 ml-10 mb-3'>
              <div className='flex'>
                <div className='ml-3'>
                  <i className={`bi bi-hand-thumbs-up ${userLiked.includes(valComments['_id']) ? "-fill text-blue-500" : ''}`}></i>
                </div>
                <div className='ml-8'>
                  <i className="bi bi-hand-thumbs-down"></i>
                </div>
              </div>
            </div>
          </div>))}
      </div>
    </div>
  )
}

export default InstructionComments