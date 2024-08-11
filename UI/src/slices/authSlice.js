import {createSlice} from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    intialState:{
        loading:true,
        isAuthenticated:false
    },
    reducers:{
        loginRequest(state,action){
             
              return{
                 loading:true,
                 isAuthenticated:false
              }
        },
        loginSuccess(state,action){
             return{
                 loading:false,
                 isAuthenticated:true,
                 user:action.payload.user
                 
             }
        },
        loginFail(state,action){
           return{
             loading:false,
             isAuthenticated:false,
             error:action.payload
           }
     },
     clearError(state,action){
         return{
             error:null,
             
             
         }
     },
     registerRequest(state,action){
             
         return{
            loading:true,
            isAuthenticated:false
         }
   },
   registerSuccess(state,action){
        return{
            loading:false,
            isAuthenticated:true,
            user:action.payload.user
            
        }
   },
   registerFail(state,action){
      return{
        loading:false,
        isAuthenticated:false,
        error:action.payload
      }
 },
      
      logoutSuccess(state,action){
         return{
             loading:false,
             isAuthenticated:false,
             
         }
      },
      logoutFail(state,action){
         return{
             ...state,
             
             error:action.payload
         }
      },
      
 forgotPasswordRequest(state,action){
     return{
         ...state,
         loading:true,
         message:null
     }
 },
 forgotPasswordSuccess(state,action){
       return{
         ...state,
         loading:false,
         message:action.payload.message
       }
 },
 forgotPasswordFail(state,action){
     return{
         ...state,
         loading:false,
         error:action.payload
     }
 },
 resetPasswordRequest(state,action){
     return{
         
         loading:true,
         isAuthenticated:false
     }
 },
 resetPasswordSuccess(state,action){
     return{
         ...state,
         loading:false,
         isAuthenticated:true,
         user:action.payload.user
     }
 },
 resetPasswordFail(state,action){
     return{
         ...state,
         loading:false,
         error:action.payload
     }
 }
 
 }});
 
 const {actions,reducer}=authSlice;
 
 export const{
     loginRequest,
     loginFail,
     loginSuccess,
     clearError,
     registerFail,
     registerRequest,
     registerSuccess,
     
     logoutFail,
     logoutSuccess,
     
    
     updatePasswordFail,
     updatePasswordRequest,
     updatePasswordSuccess,
     forgotPasswordRequest,
     forgotPasswordSuccess,
     forgotPasswordFail,
     resetPasswordRequest,
     resetPasswordSuccess,
     resetPasswordFail
 
 
 }=actions
 
 export default reducer;
