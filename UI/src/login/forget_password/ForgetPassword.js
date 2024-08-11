import React from 'react'
import "./forget.css"

const ForgetPassword = () => {
  return (
    <div>
      <div className='boxs'>
      <div className='header'>
        <div className='text'>Forget Password</div>
        <div className='Mail'>Enter your mail address</div>
      </div>
      <div className='inputs'>
        <div className='input1'>
          <input type='email' name='mail' placeholder='email'/>
        </div>
        <div className='submitbox'>
          <button>Send Mail</button>
        </div> 
        
      </div>
      </div>
      </div>
    
  )
}

export default ForgetPassword