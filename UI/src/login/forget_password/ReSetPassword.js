import React from 'react'

import "./reset.css"
const ReSetPassword = () => {
  return (
    <div>
      <div className='boxs'>
      <div className='header'>
        <div className='text'>Reset Password</div>
      </div>
      <div className='inputs'>
        <div className='Mail'>Enter new password</div>
        <div className='input1'>
          <input type='password' name='New_pass' placeholder='New password'/>
        </div>
        <div className='Mail'>Enter new password</div>
        <div className='input1'>
          <input type='password' name='Confrim_pass' placeholder='Confirm password'/>
        </div>
        <div className='submitbox'>
          <button>Submit</button>
        </div> 
        
      </div>
      </div>
    </div>
  )
}

export default ReSetPassword