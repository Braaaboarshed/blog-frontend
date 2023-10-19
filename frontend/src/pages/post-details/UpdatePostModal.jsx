
import { useEffect, useState } from 'react';
import './update-post-modal.css'
import {toast} from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../redux/apiCalls/postApiCalls';
import { fatahCategories } from '../../redux/apiCalls/categoryApiCall';
const UpdatePostModal = ( {setUpdatePost,post}) => {
const [title,setTitle] = useState(post.title)
const [description,setDescription] = useState(post.description)
const [category,setCategory] = useState(post.category)

const dispatch = useDispatch()

 const {categories} = useSelector(state => state.category)

const handleUpdatePost = (e)=>{
    e.preventDefault()
    if(title.trim()==='') return toast.error('title is required')
    if(category.trim()==='') return toast.error('category is required')
    if(description.trim()==='') return toast.error('description is required')

    dispatch(updatePost(post?._id,{title,category,description}))
    setUpdatePost(false)
    
}
useEffect(()=>{
    dispatch(fatahCategories())
},[])

 return ( 
        <div className="update-post">
            <form className='update-post-form' onSubmit={handleUpdatePost}>
                <abbr title="close">
                    <i onClick={()=>setUpdatePost(false)} className="bi bi-x-circle-fill update-post-form-close"></i>
                </abbr>
                <h1 className="update-post-title">Update Post</h1>
                <input type="text"
                 placeholder='title'
                  className="update-post-input" 
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  />
                <select id="" value={category} onChange={(e)=>setCategory(e.target.value)}>
                    {categories.map( category =>
                    <option value={category.title} key={category._id}>{category.title}</option>
                        )}
            
                </select>
                <textarea 
                 className='update-post-textarea'
                  placeholder='description' 
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                  ></textarea>
                <button type='submit' className="update-post-btn">Save</button>


            </form>
        </div>
     );
}
 
export default UpdatePostModal;