import { useState } from 'react';
import './comments-list.css'
import UpdateCommentModal from '../../components/commemts/UpdateCommentModal'
import swal from 'sweetalert';
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../redux/apiCalls/commentApiCall';
const CommentsList = ( {comments}) => {
 const {post} = useSelector(state =>state.post)
 const {user} = useSelector (state =>state.auth)
const dispatch = useDispatch()
 console.log(comments)
    //delete comment handler
    const deleteCommentHandler = (commentId) =>{
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this comment?",
            icon: "warning",
            dangerMode: true,
          })
          .then(isOk => {
            if (isOk) {
                dispatch(deleteComment(commentId))
              swal("Deleted!", "Your comment  has been deleted!", "success");
            }
          });
    }
    const [updateComment,setUpdateComment] = useState(false);
    const [updateCommentForModal,setUpdateCommentForModal] = useState(null);

    const updateCommentHandler =(comment)=>{
        setUpdateCommentForModal(comment)
        setUpdateComment(true)
    }

    return ( 
        <div className="comment-list">
            <h4 className="comment-list-count">{comments?.length} Comment</h4>
            {comments?.map(comment =>(
                <div className="comment-item" key={comment}>
                    <div className="comment-item-info">
                        <div className="comment-item-username">
                            {comment?.username}
                        </div>
                    <div>
                  
                    <Moment fromNow  className='post-date' >
                       {(comment?.createdAt)} 
                           
                      
                       </Moment> 
                          
                    </div>
                       
                    </div>
                    <p className="comment-item-text">
                       {comment.text}
                    </p>
                    {user?._id === comment?.user &&
                    <div className="comment-item-icon-wrapper">
                        <i onClick={()=>updateCommentHandler(comment)} className="bi bi-pencil-square"></i>
                        <i onClick={() => deleteCommentHandler(comment._id)} className="bi bi-trash-fill"></i>
                    </div>
                       }
                    {updateComment && 
                    <UpdateCommentModal 
                    updateCommentForModal={updateCommentForModal} 
                    setUpdateComment={setUpdateComment}
                    />
                }
                </div>
            ))}
        </div>
     );
}
 
export default CommentsList
;