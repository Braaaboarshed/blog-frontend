import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {toast ,ToastContainer} from 'react-toastify'
import {deletePost, fetchPostById,toggleLikePost, updatePostImage} from '../../redux/apiCalls/postApiCalls'
import swal from 'sweetalert'
import './post-details.css'
import { useEffect, useState } from "react";
import AddComments from "../../components/commemts/AddComments";
import CommentsList from "../../components/commemts/CommentsList";
import UpdatePostModal from "./UpdatePostModal";
import { useDispatch, useSelector } from "react-redux";
const PostDetails = () => {
    const [file,setFile] =useState(null);
    const [updatePost,setUpdatePost] = useState(false)
    const {id} = useParams();
    const dispatch = useDispatch()
    const {post} = useSelector(state =>state.post)
    const {user} = useSelector(state => state.auth)
    const navigate = useNavigate()
    // console.log(user._id ,post?.user._id)
    useEffect(()=>{
        window.scrollTo(0,0)
        
        dispatch(fetchPostById(id))
        console.log(post?.likes.length)
    },[id])
    

    const updateImageSubminHandler = (e)=>{
        e.preventDefault();
        if(!file){
            return toast.error('there is no file')
        }
       const formData = new FormData() ;
       formData.append("image",file)
       dispatch(updatePostImage(post?._id,formData))
    }



    // delete post handler
    const deletePostHandler =() =>{
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this post?",
            icon: "warning",
            dangerMode: true,
          })
          .then(isOk => {
            if (isOk) {
              dispatch(deletePost(post?._id))
              navigate(`/profile/${user?._id}`)
            }
           
          });
    }

  

    return (  
        <section className="post-details">
            <ToastContainer/>
                <img src={file ? URL.createObjectURL(file) : post?.image.url} alt="" className="post-item-image" />
            <div className="post-details-image-wrapper">

                 {user?._id === post?.user._id &&
                    <form ngSubmit={updateImageSubminHandler} className="update-post-image-form">
                        <label htmlFor="file" className="update-post-label">
                            <i className="bi bi-image-fill"></i>
                            Select new image
                        <input type="file" 
                         name="file"
                          id="file" 
                          onChange={(e)=>setFile(e.target.files[0])}
                          />
                        </label>
                        <button onClick={updateImageSubminHandler} type="submit">upload</button>
                    </form>
                    }
              </div>
              <h1 className="post-details-title">{post?.title}</h1>
              <div className="post-details-user-info">
            <img src={post?.user.profilePhoto.url} alt="" className="post-details-user-image" />
                <div className="post-details-user">
                    <strong>
                        <Link to='/profile/1'>{post?.user.username}</Link>
                    </strong>
                    <span>{post?.createdAt}</span>
                </div>
              </div>
              <p className="post-details-description">
                {post?.description}
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis totam doloremque nulla, esse atque in quidem quos corrupti similique sed dicta repellat nesciunt unde cumque quibusdam commodi illo. Libero, inventore.

              </p>

              <div className="post-details-icon-wrapper">
              {user?._id && 
                <div >
                    <i className={
                        post?.likes.includes(user._id)  ? "bi bi-hand-thumbs-up-fill" :
                        "bi bi-hand-thumbs-up"} 
                    onClick={()=> dispatch(toggleLikePost(post._id)  )}  >
                    </i>
                      <small>{post?.likes.length }</small>
                </div>
            }
              {user?._id === post?.user._id && 
                <div>
                    <i onClick={()=>setUpdatePost(true)} className="bi bi-pencil-square"></i>
                    <i onClick={deletePostHandler}  className="bi bi-trash-fill"></i>
                </div>
                }
              </div>
              {user? <AddComments postId={post?._id} /> : 
              <p>you should login before write a comment</p>
              }
              <CommentsList comments = {post?.comments} />
             {updatePost && <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />}
         </section>
    );
}
 
export default PostDetails;