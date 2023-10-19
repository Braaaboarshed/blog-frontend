import { useEffect, useState } from "react";
import PostList from "../../components/posts/PostList";
import  "./profile.css"
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";
import UpdateProfileModal from "./UpdateProfileModal";
import { useDispatch,useSelector } from "react-redux";
import { useParams ,useNavigate} from "react-router-dom";
import { deleteProfile, getUserProfile, uploadProfilePhoto } from "../../redux/apiCalls/profileApiCalls";
import {LogoutUser } from "../../redux/apiCalls/authApiCalls"
import {RotatingLines } from 'react-loader-spinner'
import PostItem from "../../components/posts/PostItem";
const Profile = () => {


    const {profile,loading,isProfileDeleted} = useSelector(state =>state.profile)
    const {user} = useSelector(state =>state.auth)


    const dispatch = useDispatch()
    const {id} = useParams()
  useEffect(()=>{
      dispatch(getUserProfile(id))
    window.scrollTo(0,0)
  },[id])
    
  const navigate =useNavigate()
  useEffect(()=>{
    if(isProfileDeleted)
    navigate("/")
},[isProfileDeleted,navigate])

  const deleteAccunt =() =>{
    swal({
        title: "Are you sure?",
        text: "Are you sure that you want to delete your profile?",
        icon: "warning",
        dangerMode: true,
      })
      .then(isOk => {
        if (isOk) {
            console.log(user?._id)
          dispatch(deleteProfile(profile?._id))
          dispatch(LogoutUser())
        }
      
      });
}
const [openModal,setOpenModal] = useState(false)
  

    const [file,setFile] = useState(null)

    const handleUpdateImage = (e)=>{
        e.preventDefault();
        if(!file) return toast.warning('please select image')
        const formData = new FormData()
        formData.append("image",file)
       dispatch(uploadProfilePhoto(formData))
    }

        if(loading){
            return(
           <div>
                 <RotatingLines
                strokeColor="white"
                strokeWidth="3"
                animationDuration="0.75"
                width="30"
                visible={true}
              />
           </div>
                
            )
        }
    return (  
        <section className="profile">
            <ToastContainer/>
            <div className="profile-header">
                <div className="profile-image-wrapper">
                    <img 
                    src=  {file  ? URL.createObjectURL(file) : profile?.profilePhoto?.url }
                     alt=""
                     className="profile-image"
                     />
                 {user?._id === profile?._id && (
                        <form  className="upload-photo-form" onSubmit={handleUpdateImage} >
                        <abbr title="choose profile-photo">
                            <label 
                            htmlFor="file"
                            className="bi bi-camera-fill upload-profile-icon"
                            ></label>
                        </abbr>
                        <input type="file" onChange={(e)=>setFile(e.target.files[0])} name="file" id="file"/>
                        <button type="submit"  className="upload-profile-photo-btn">upload</button>
                     </form>
                 )}
                </div>
                <h1 className="profile-username">{profile?.username}</h1>
                <p className="profile-bio">
                    {profile?.bio}
                </p>
                <div className="user-date-joined">
                    <p>Date of joined :</p>
                    <strong> {new Date(profile?.createdAt).toDateString()}</strong>
                </div>
                {user?._id === profile?._id && (
                    <button onClick={()=>setOpenModal(true)}  className="profile-update-btn">
                    <i  className="bi bi-file-person-fill"></i>
                    Update profile 
                </button>
                )} 
            </div>
            <div className="profile-posts-list">
                <h2>{profile?.username} Posts</h2>
             
                {profile?.posts?.map((post) => 
                <PostItem  
                key={post?._id}
                 post = {post}
                 username = {profile?.username}
                 userId = {profile?._id}
                 ></PostItem>
                )}
            </div>
        { user?._id === profile?._id && (
                <button
                onClick={deleteAccunt}
            className="delete-account-btn">
                Delete My Account
            </button>
        )} 
         <div className="modal-holder">
         {openModal && (
                <UpdateProfileModal profile ={profile} setOpenModal={setOpenModal} />
            )}
         </div>
        </section>
    );
}
 
export default Profile;