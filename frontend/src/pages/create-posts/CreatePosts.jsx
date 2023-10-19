import { useEffect, useState } from 'react';
import './create-post.css';
import {toast,ToastContainer} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../redux/apiCalls/postApiCalls';
import { loading , isPostCreated} from '../../redux/apiCalls/postApiCalls'
import { useNavigate } from 'react-router-dom';
import {RotatingLines } from 'react-loader-spinner'
import { fatahCategories } from '../../redux/apiCalls/categoryApiCall';
const CreatePosts = () => {

   const [title,setTitle] = useState("");
   const [category,setCategory] = useState("");
   const [description,setDescription] = useState("");
   const [file,setFile] = useState(null);

    const dispatch = useDispatch()
    const {isLoading , isPostCreated} = useSelector(state =>state.post)


   const fromSubmitHandler = (e)=>{
    e.preventDefault()
 
    if(title.trim()==='') return toast.error('title is required')
    if(category.trim()==='') return toast.error('category is required')
    if(description.trim()==='') return toast.error('description is required')
    if(!file) return toast.error('file is required')

    const formData = new FormData()
    formData.append("title",title)
    formData.append("category",category)
    formData.append("description",description)
    formData.append("image",file)

    dispatch(createPost(formData))
   }
   const {categories} = useSelector(state =>state.category)

   const navigate = useNavigate()

   useEffect(()=>{
    if(isPostCreated) navigate("/")
        dispatch(fatahCategories())
   },[isPostCreated,navigate])

    return ( 

        
        <div className="section create-post">
 
            <ToastContainer/>
            <h1 className="create-post-title">
                Create New Post
            </h1>
            <from className="create-post-form " onSubmit={fromSubmitHandler} >
                <input
                type="text"
                placeholder="Post Title"
                className="create-post-input"
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                />
                <select
                 className="create-post-input"
                 value={category}
                 onChange={(e)=>{setCategory(e.target.value)}}
                 >
                    <option disabled value="">Select A Category</option>
                    {categories.map(category =>(

                    <option value={category.title} key={category._id} >{category?.title}</option>
                    ))}
                

                </select>

                <textarea  
                className="create-post-textarea"
                placeholder="Post Description"
                value={description}
                onChange={(e)=>{setDescription(e.target.value)}}
                >    
                </textarea>
                <input 
                type="file"
                className="create-post-upload"
                name="file"
                id="file"
              
                onChange={(e)=>{setFile(e.target.files[0])}}
                />
                <button className="create-post-btn" type="submit" onClick={fromSubmitHandler}  >
                    {
                    isLoading ? 
                    
                    <RotatingLines
                    strokeColor="white"
                    strokeWidth="3"
                    animationDuration="0.75"
                    width="30"
                    visible={true}
                  />
                    : 'create'
                    }
                    
              
                    </button>
            </from>

        </div>
    );
}
 
export default CreatePosts;