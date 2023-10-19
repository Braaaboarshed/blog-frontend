import {configureStore} from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlices";
import { profileReducer } from "./slices/profileSlice";
import { postReduces } from "./slices/postSliec";
import {  categoryReducer } from "./slices/categorySlliec";
import { commentReduces } from "./slices/commentSliec";

const store = configureStore({
    reducer :{
        auth :authReducer,
        profile :profileReducer,
        post :postReduces,
        category :categoryReducer,
        comment :commentReduces
    }
})

export default store ;