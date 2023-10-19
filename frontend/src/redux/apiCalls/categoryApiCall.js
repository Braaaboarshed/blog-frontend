import request from '../..//utils/request'
import { toast } from "react-toastify";

import { categoryActions } from '../slices/categorySlliec';

export function fatahCategories(){
    return async(dispatch) =>{
        try{
           const {data} = await  request.get(`/api/category`)
           dispatch(categoryActions.setCategory(data))
    
        }
        catch(error){
            toast.error(error)
        }
    }
} ;

export function deleteCategory(categoryId){
    return async(dispatch,getState) =>{
        try{
           const {data} = await  request.delete(`/api/category/${categoryId}`,{
            headers :{
                Authorization : 'Bearer ' + getState().auth.user.token
             }
           })
           console.log(data)
           dispatch(categoryActions.deleteCategory(data.categoryId))
    
        }
        catch(error){
            toast.error(error)
        }
    }
} ;

export function createCategory(newCategory){
    return async(dispatch,getState) =>{
        try{
           const {data} = await  request.post(`/api/category`,newCategory,{
            headers :{
                Authorization : 'Bearer ' + getState().auth.user.token
            }
           })
           dispatch(categoryActions.addCategory(data))
           toast.success('category created successfully')
        }
        catch(error){
            toast.error(error)
        }
    }
} ;




