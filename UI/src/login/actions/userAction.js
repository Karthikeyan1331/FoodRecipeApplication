import axios from 'axios';
import { 
    loginRequest,
    loginFail,
    loginSuccess,
     clearError,
    registerFail,
registerSuccess,
registerRequest,
loadUserRequest,
loadUserSuccess,
loadUserFail,
logoutSuccess,
logoutFail,
updateprofileRequest,
updateProfileSuccess,
updateProfileFail,
updateProfileChange,
updatePasswordRequest,
updatePasswordSuccess,
updatePasswordFail,
forgotPasswordRequest,
forgotPasswordSuccess,
forgotPasswordFail,
resetPasswordRequest,
resetPasswordSuccess,
resetPasswordFail
 } 
 from '../slices/authSlice';

import {  } from '../slices/userSlice';

export const login=(email,password)=>async(dispatch)=>{
    try{
        dispatch(loginRequest())
        const{data}=await axios.post('/api/v1/login',{email,password});
        dispatch(loginSuccess(data))
    }
    catch(error){
        dispatch(loginFail(error.response.data.message))
    }
}

export const clearAuthError=dispatch=>{
    console.log("hello")
    dispatch(clearError())
}



export const register=(userData)=>async(dispatch)=>{
    try{
        dispatch(registerRequest())
        /*const config={
            headers:{
                'Content-type':'multipart/form-data'
            }
        }*/
        const{data}=await axios.post('/api/v1/register',userData);
        dispatch(registerSuccess(data))
    }
    catch(error){
        dispatch(registerFail(error.response.data.message))
    }
}


export const logout=async(dispatch)=>{
    try{
       
        /*const config={
            headers:{
                'Content-type':'multipart/form-data'
            }
        }*/
        await axios.get('/api/v1/logout');
        dispatch(logoutSuccess())
    }
    catch(error){
        dispatch(logoutFail(error.response.data.message))
    }
}

export const forgotPassword=(userData)=>async(dispatch)=>{
    try{
        dispatch(forgotPasswordRequest())
        const{data}=await axios.post('/api/v1/password/forgot',userData);
        dispatch(forgotPasswordSuccess(data))
    }
    catch(error){
        dispatch(forgotPasswordFail(error.response.data.message))
    }
}

export const resetPassword=(userData,token)=>async(dispatch)=>{
    try{
        console.log("goku")
        dispatch(resetPasswordRequest())
        const{data}=await axios.post(`/api/v1/password/reset/${token}`,userData);
        dispatch(resetPasswordSuccess(data))
    }
    catch(error){
        dispatch(resetPasswordFail(error.response.data.message))
    }
}




