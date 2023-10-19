

import request from '../..//utils/request'
import { toast } from "react-toastify";
import { postActions } from "../slices/postSliec";
import { commentActions } from '../slices/commentSliec';

export function createComment(newComment){
    return async(dispatch,getState) =>{
        try{
           const {data} = await  request.post(`/api/comments`,newComment,{
            headers:{
                Authorization :"Bearer " + getState().auth.user.token
            }
           })
           dispatch(postActions.addCommentToPost(data))
        }
        catch(error){
            toast.error(error.response.error)
        }
    }
}
export function getAllComment(){
    return async(dispatch,getState) =>{
        try{
           const {data} = await  request.get(`/api/comments`,{
            headers:{
                Authorization :"Bearer " + getState().auth.user.token
            }
           })
           dispatch(commentActions.setComments(data))
        }
        catch(error){ 
            toast.error(error.response.error)
        }
    }
}






export function deleteComment(commentId){
    return async(dispatch,getState) =>{
        try{
           const {data} = await  request.delete(`/api/comments/${commentId}`,{
            headers:{
                Authorization :"Bearer " + getState().auth.user.token
            }
           })
           dispatch(postActions.deleteComment(data))
           dispatch(commentActions.deleteComment(data))
        }
        catch(error){
            toast.error(error.response)
        }
    }
}

export function updateComment(commentId,newComment){
    return async(dispatch,getState) =>{
        try{
           const {data}= await  request.put(`/api/comments/${commentId}`,newComment,{
            headers:{
                Authorization :"Bearer " + getState().auth.user.token
            }
           })

           dispatch(postActions.updateCommentPost(data))
         
        }
        catch(error){
            // toast.error('error')
            console.log(error)
        }
    }
}
