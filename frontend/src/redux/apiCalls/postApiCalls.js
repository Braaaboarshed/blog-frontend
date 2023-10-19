

import request from '../..//utils/request'
import { toast } from "react-toastify";
import { postActions } from "../slices/postSliec";
import { authActions } from "../slices/authSlices";

export function fatahPosts(pageNumber){
    return async(dispatch) =>{
        try{
           const {data} = await  request.get(`/api/posts?pageNumber=${pageNumber}`)
           dispatch(postActions.setPosts(data))
        }
        catch(error){
            toast.error(error.response.error)
        }
    }
}


export function getAllPosts(){
    return async(dispatch) =>{
        try{
           const {data} = await  request.get(`/api/posts`)
           dispatch(postActions.setPosts(data))
        }
        catch(error){
            toast.error(error.response.error)
        }
    }
}

export function getPostCount(){
    return async(dispatch) =>{
        try{
            const {data} = await request.get('/api/posts/count')
            dispatch(postActions.setPostsCount(data))
         
        }
        catch(error){
            toast.error(error.response.message)

        }
    }
}
// get post by category

export function getPostByCategory(category){
    return async(dispatch) =>{
        try{
           const {data} = await  request.get(`/api/posts?category=${category}`)
           dispatch(postActions.setPostsCate(data))
        console.log(data)
        }
        catch(error){
            toast.error(error.response)
        }
    }
}

export function createPost(newPost){
    return async(dispatch , getState) =>{
        try{
            dispatch(postActions.setLoading())
       await request.post('/api/posts',newPost,{
                headers : {
                    Authorization : 'Bearer ' + getState().auth.user.token,
                    "Content-type" :'multipart/form-data'
                }
            });
            dispatch(postActions.setIsPostCreated())
            toast.success('successfully posted')
            setTimeout(()=> dispatch(postActions.clearIsPostCreated()),2000)
        }
        catch(error){
            toast.error(error.response.data.message)
            console.log(getState().auth.user.token)
            dispatch(postActions.clearLoading())
        }
    }
}

export function fetchPostById(postId){
    return async(dispatch) =>{
    try{
        const post = await request.get(`/api/posts/${postId}`)
        dispatch(postActions.setPost(post.data))
    }
    catch(error){
        console.log(error)
        toast.error(error.message)
    }
    }
}


export function toggleLikePost(postId){
    return async(dispatch,getState) =>{
    try{
        const {data} = await request.put(`/api/posts/like/${postId}`,{},{
            headers : {
                Authorization :  "Bearer " +  getState().auth.user.token
            }
        })
        dispatch(postActions.setLike(data))
   
    }
    catch(error){
        console.log(error)
        toast.error(error)

    }
    }
}

export function updatePostImage(postId,newImage){
    return async(dispatch,getState) =>{
    try{
       await request.put(`/api/posts/update-image/${postId}`,newImage,{
            headers : {
                Authorization :  "Bearer " +  getState().auth.user.token,
                "Content-type" :'multipart/form-data'
            }
        })
        toast.success('new image post has been uploaded successfully')
    }
    catch(error){
        toast.error(error)

    }
    }
}


export function updatePost(postId,newPost){
    return async(dispatch,getState) =>{
    try{
    const {data} =   await request.put(`/api/posts/${postId}`,newPost,{
            headers : {
                Authorization :  "Bearer " +  getState().auth.user.token,
            }
        })
        toast.success('new  post has been uploaded successfully')
        dispatch(postActions.setPost(data))
        console.log(data)
    }
    catch(error){
        console.log(error)
        toast.error(error)

    }
    }
}

export function deletePost(postId){
    return async(dispatch,getState) =>{
    try{
     const {data} = await request.delete(`/api/posts/${postId}`,{
            headers : {
                Authorization :  "Bearer " +  getState().auth.user.token,
            }
        })
        dispatch(postActions.deletePost(data.postId))
        toast.success(data.message)
  
    }
    catch(error){
        console.log(error)
        toast.error(error)

    }
    }
}

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
