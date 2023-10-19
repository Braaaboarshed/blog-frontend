import { authActions } from "../slices/authSlices";
import request from '../..//utils/request'
import { toast } from "react-toastify";

export function loginUser(user){
    return async (dispatch) =>{
        try {
            const {data} = await request.post("/api/auth/login",user)
          dispatch(authActions.login(data))
          localStorage.setItem('userInfo',JSON.stringify(data))
        } 
        catch(error){
            toast.error(error.response.data.message)
            console.log(error.response.data.message)
        }
    }
}



export function LogoutUser(user){
   return (dispatch) =>{
    dispatch(authActions.logout())
    localStorage.removeItem('userInfo')
   }
}

export function register(user){
    return async (dispatch) =>{
        try {
            const {data} = await request.post("/api/auth/register",user)
          dispatch(authActions.register(data.message))
         
        } 
        catch(error){
            toast.error(error.response.data.message)
        }
    }
}