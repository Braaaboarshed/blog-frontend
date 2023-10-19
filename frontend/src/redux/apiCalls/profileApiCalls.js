
import {profileActions} from "../slices/profileSlice";
import request from '../..//utils/request'
import { toast } from "react-toastify";
import { authActions } from "../slices/authSlices";

export function getUserProfile(userId){
    return async (dispatch) =>{
        try {
            const {data} = await request.get(`/api/users/profile/${userId}`)
          dispatch(profileActions.setProfile(data))
        } 
        catch(error){
            toast.error(error.response.data.message)
            console.log(error.response.data.message)
        }
    }
}

export function uploadProfilePhoto(newPhoto){
    return async (dispatch,getState) =>{
        try {
            const {data} = await request.post('/api/users/profile/photo-upload',newPhoto,{
                headers:{
                    Authorization : "Bearer " + getState().auth.user.token,
                    "Content-Type" : "multipart/form-data" 

                }
            })
          dispatch(profileActions.uploadProfilePhoto(data))
          dispatch(authActions.setUserPhoto(data.profilePhoto))
          toast.success(data.message)

          // modify the user in loacl storage with new photo
          const user = JSON.parse(localStorage.getItem('userInfo'))
          user.profilePhoto = data?.profilePhoto;
          localStorage.setItem("userInfo",JSON.stringify(user))

        } 
        catch(error){
            toast.error(error.response.data.message)
            console.log(error.response.data.message)
        }
    }
}

export function uploadProfile(userId,profile){
    return async (dispatch,getState) =>{
        try {
            const {data} = await request.put(`/api/users/profile/${userId}`,profile,{
                headers:{
                    Authorization : "Bearer " + getState().auth.user.token
                }
            })
          
          dispatch(profileActions.updateProfile(data))
          dispatch(authActions.setUsername(data.username))
        //   toast.success(data.message)
            console.log(data)
          // modify the user in loacl storage with new profile
          const user = JSON.parse(localStorage.getItem('userInfo'))
          user.username = data?.username;
          localStorage.setItem("userInfo",JSON.stringify(user))

        } 
        catch(error){
            toast.error(error)
            console.log(error)
        }
    }
}

export function deleteProfile(userId){
    return async (dispatch,getState) =>{
        dispatch(profileActions.setLoading())
        try {
           await request.delete(`/api/users/profile/${userId}`,{
                headers:{
                    Authorization : "Bearer " + getState().auth.user.token
                }
            })
        dispatch(profileActions.setIsProfileDeleted())
        setTimeout(()=>dispatch(profileActions.clearIsProfileDeleted()),2000)
        toast.success('your account deleted successfully')
        } 
        catch(error){
            console.log(error)
            toast.error(error.response)
            dispatch(profileActions.clearLoading())
        }
    }
}



export function getAllProfiles(){
    return async(dispatch,getState) =>{
        try{
           const {data} = await  request.get(`/api/users/profile`,{
            headers :{
                Authorization : 'Bearer ' + getState().auth.user.token
            }
           })
           dispatch(profileActions.setProfiles(data))
           
        }
        catch(error){
            toast.error(error)
        }
    }
}