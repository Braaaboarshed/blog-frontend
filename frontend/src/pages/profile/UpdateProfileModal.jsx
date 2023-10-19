
import { useState } from 'react';
import './profile-modal.css'  ; 
import {toast} from 'react-toastify'
import { useDispatch } from 'react-redux';
import { uploadProfile } from '../../redux/apiCalls/profileApiCalls';



const UpdateProfileModal = ( {setOpenModal,profile}) => {
    const [username,setUsername] = useState(profile?.username)
    const [bio,setBio] = useState(profile?.bio)
    const [password,setPassword] = useState('')
    
    const dispatch = useDispatch();

    // hamdleUpdateprofile
    
    const fromSubmitHandler =(e)=>{
        e.preventDefault()
        const updatedUser ={username , bio}
        if(password.trim() !== ""){
            updatedUser.password = password
        }
        dispatch(uploadProfile(profile?._id,updatedUser))
        // console.log(updatedUser)
        setOpenModal(false)
    } 

 return ( 
        <div className="update-profile">
            <form className='update-profile-form' onSubmit={fromSubmitHandler}>
                <abbr title="close">
                    <i onClick={()=>setOpenModal(false)} className="bi bi-x-circle-fill update-profile-form-close"></i>
                </abbr>
                <h1 className="update-profile-title">Update profile</h1>
                <input type="text"
                 placeholder='username'
                  className="update-profile-input" 
                  value={username}
                onChange={(e)=>setUsername(e.target.value)}                  
                  />
                <input type="text"
                 placeholder='bio'
                  className="update-profile-input" 
                  value={bio}
                onChange={(e)=>setBio(e.target.value)}                  
                  />
                 <input type="text"
                 placeholder='password'
                  className="update-profile-input" 
                  value={password}
                onChange={(e)=>setPassword(e.target.value)}                  
                  />
             
                <button type='submit' className="update-profile-btn">Save</button>


            </form>
        </div>
      
     );
}
 
export default UpdateProfileModal;