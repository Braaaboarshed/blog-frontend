import { createSlice } from "@reduxjs/toolkit";

const postSlice= createSlice({
    name :"post",
    initialState : {

        posts :[],
        postCount :null,
        postCate :[],
        isLoading :false,
        isPostCreated :false,
        

    },
    reducers :{

        setPosts(state,action){
            state.posts = action.payload
        },
        setPostsCount(state,action){
            state.postCount = action.payload
        },
        setPostsCate(state,action){
            state.postCate = action.payload
        },
        setLoading(state){
            state.isLoading = true
        },
        clearLoading(state){
            state.isLoading = false
        },
        setIsPostCreated(state){
            state.isPostCreated = true
            state.isLoading = false
        },
        clearIsPostCreated(state){
            state.isPostCreated = false
        },

        setPost(state,action){
            state.post = action.payload
        } ,
        setLike(state,action){
            state.post.likes = action.payload.likes
        
        },
        deletePost(state,action){
            state.posts = state.posts.filter(p=>p._id !== action.payload)
            
        },
        addCommentToPost(state,action){
            state.post.comments.push(action.payload)
         
        },

        updateCommentPost(state,action){

            state.post.comments = state.post.comments.map(comment =>
             
                 comment._id === action.payload._id ? action.payload : comment)
        
        },
        deleteComment(state,action){
            const comment = state.post.comments.find(c =>c._id === action.payload)
            const commentIndex = state.post.comments.indexOf(comment)

            state.post.comments.splice(commentIndex,1)
        }

        
    }



});
 const postActions = postSlice.actions;
 const postReduces = postSlice.reducer

 export {
    postActions,postReduces
 }