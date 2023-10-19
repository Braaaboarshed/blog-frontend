
import { useState } from 'react';
import './update-comment.css'
import {toast} from 'react-toastify'
import { useDispatch } from 'react-redux';
import { updateComment } from '../../redux/apiCalls/commentApiCall';

const UpdateCommentModal = ( {setUpdateComment,updateCommentForModal}) => {
const [text,setText] = useState(updateCommentForModal.text)
const dispatch = useDispatch()

//hamdleUpdatecomment

const handleUpdateComment = (e)=>{
    e.preventDefault()
    if( text.trim() === '') return toast.error('text is required')
    dispatch(updateComment(updateCommentForModal._id,{text}))
setUpdateComment(false)
}

 return ( 
        <div className="update-comment">
            <form className='update-comment-form' onSubmit={handleUpdateComment}>
                <abbr title="close">
                    <i onClick={()=>setUpdateComment(false)} className="bi bi-x-circle-fill update-comment-form-close"></i>
                </abbr>
                <h1 className="update-comment-text">Update comment</h1>
                <input type="text"
                 placeholder='text'
                  className="update-comment-input" 
                  value={text}
                  onChange={(e)=>setText(e.target.value)}
                  />
             
                <button type='submit' className="update-comment-btn">Save</button>


            </form>
        </div>
     );
}
 
export default UpdateCommentModal;