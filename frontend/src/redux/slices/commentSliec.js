import { createSlice } from "@reduxjs/toolkit";

const commentSlice= createSlice({
    name :"comment",
    initialState : {
        comments:[]

        

    },
    reducers :{
        setComments(state,action){
            state.comments = action.payload
        },
        deleteComment(state,action){
            state.comments = state.comments.filter(comment => comment._id !== action.payload)
        }
   
        
    }



});
 const commentActions = commentSlice.actions;
 const commentReduces = commentSlice.reducer

 export {
    commentActions,commentReduces
 }