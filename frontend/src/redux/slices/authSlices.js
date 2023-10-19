import { createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "auth",
    initialState :{
        user  :localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo')) : null ,
        registerMessage : null
    },
    reducers: {
    login(state,action){
        state.user = action.payload;
        state.registerMessage =null
    },
    logout(state,action){
        state.user = null
    },
    register(state,action){
        state.registerMessage = action.payload
    },
    setUserPhoto(state,action){
        state.user.profilePhoto = action.payload
    },
    setUsername(state,action){
        state.user.username = action.payload
    }
    }
}) ;

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export {authActions,authReducer}