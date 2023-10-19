import { Link } from "react-router-dom";
import {  useSelector,useDispatch } from "react-redux";

import { useState } from "react";
import { LogoutUser } from "../../redux/apiCalls/authApiCalls";
const HeaderRight = () => {
    const {user} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
   const  [openDropdown,setOpenDropdown] = useState(false)
    const handleDropdown = ()=>{
        if(!openDropdown) setOpenDropdown(true)
        else setOpenDropdown(false)

        
    }
   

    return (
        <div className="header-right">
            {!user ? 
            <>
             <div className="header-right-link">
        <button className="register">
        <i class="bi bi-person-fill-add"></i>
           <Link to='/register'> Register</Link>
        </button>

        <button className="Login">
        <i class="bi bi-box-arrow-in-right"></i>
        <Link to='/login'> login</Link>
        </button>
        </div>
            </> :
            (
                <>
                <div className="header-right-userInfo">
                    <span onClick={handleDropdown} className="header-username">{user?.username}</span>
                    <img 
                    src={user?.profilePhoto.url}
                     alt=""
                     className="header-right-user-photo"
                     />
                </div>
                    {
                        openDropdown ?
                        <div className="header-right-dropdown">
                        <Link  className="header-content" 
                        to={`/profile/${user?._id}`}
                        onClick={handleDropdown}
                        >
                            <i className="bi bi-person"></i>
                            <p className="dropdown-item" >Profile</p>
                        </Link>
                        <Link className="header-content"
                         onClick={handleDropdown}
                        >
                        <i class="bi bi-box-arrow-left"></i>
                            <p 
                         onClick={()=>dispatch(LogoutUser())}
                            className="dropdown-item">Logout
                            </p>
                        </Link>
                     </div> 
                     :null
                    }
                </>
            )
        }
         </div>
      );
}
 
export default HeaderRight;