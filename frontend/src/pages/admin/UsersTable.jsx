import Sidebar from "../../components/sidebar/Sidebar";
// import "./admin.css
import "./tables.css"
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProfile, getAllProfiles } from "../../redux/apiCalls/profileApiCalls";
import { Link } from "react-router-dom";
const UsersTable = () => {

  const dispatch = useDispatch()
  const {profiles} = useSelector(state =>state.profile) 
  const {isProfileDeleted} = useSelector(state =>state.profile)
  console.log(profiles)
    const deleteUserHandler =(userId) =>{
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this user?",
            icon: "warning",
            dangerMode: true,
          })
          .then(isOk => {
            if (isOk) {
             dispatch(deleteProfile(userId))
            }
          });
    }

    useEffect(()=>{
      dispatch(getAllProfiles())
    },[isProfileDeleted])



    const item ={
        user : 'ali',
        email:'braa@gmail.com'

    }
    return ( 


        
   <div className="table-page">
        <AdminSidebar />
        <div className="table-container">
            
        <table>
 <thead>
 <tr>
    <th>Count</th>
    <th>User </th>
    <th>Email</th>
    <th>Action</th>
  </tr>

 </thead>

  
  <tbody >
      {profiles.map((user,index) => (
       <tr>
        <td className="count">{index +1}</td>
        <td className="username">
       
        <div className="userInfo">
        <img src={user.profilePhoto.url} alt="" className="profilePhoto" />
          {user.username}
        </div>
       
          </td>
        <td className="email">{user.email}</td>
        <td>
        <Link to={`/profile/${user._id}`}>
            <button className="edit-btn">View Profile</button>
            </Link>
            <button className="delete-btn" onClick={ () => deleteUserHandler(user._id)}>delete</button>
        </td>
       </tr>
       
        ))}
       
    </tbody>
</table>
        </div>

        
    
   </div>
     );
}
 
export default UsersTable;