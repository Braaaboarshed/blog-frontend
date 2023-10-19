import './add-comment.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createComment } from '../../redux/apiCalls/commentApiCall';

const AddComments = ({postId}) => {
    
    const dispatch = useDispatch()

    const [text,setText] = useState("");
  
    const formSubmitHandler = (e) =>{
        e.preventDefault();
        if(text.trim() === '') {return toast.error("Please write something")}
        dispatch(createComment({text,postId}))
    }
    return ( 
        <form className="add-comment" onSubmit={formSubmitHandler} >
            <input type="text"
             placeholder='Add a comment' 
             className='add-comment-input'
             onChange={(e)=>setText(e.target.value)}
             />
             <button className='comment-btn' type='submit'   placeholder='add-comment-placeholder'>
                Comment
             </button>

        </form>
     );
}
 
export default AddComments;