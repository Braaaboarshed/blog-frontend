import Sidebar from "../../components/sidebar/Sidebar";
// import "./admin.css
import "./tables.css"
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { deletePost, fatahPosts, getAllPosts } from "../../redux/apiCalls/postApiCalls";

const PostTable = () => {

    const dispatch = useDispatch();

    const {posts} = useSelector(state =>state.post)
    
    const deletePostHandler =(postId) =>{
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this post?",
            icon: "warning",
            dangerMode: true,
        })
        .then(isOk => {
            if (isOk) {
              dispatch(deletePost(postId))
            }
        });
    }

    useEffect(()=>{
        dispatch(getAllPosts())

    })



    
    return ( 

        
        
        <div className="table-page">
        <AdminSidebar />

     

        <div className="table-container">
        <table>
 <thead>
 <tr>
    <th>Count</th>
    <th>User </th>
    <th>Post Title</th>
    <th>Action</th>
  </tr>

 </thead>

  
  <tbody >
      {posts.map((post,index) => (
       <tr>
        <td className="count">{index+1}</td>
        <td className="username">{post?.user.username}</td>
        <td className="email">{post.title}</td>
        <td>
            <Link to={`/posts/details/${post._id}`}>
                  <button className="edit-btn">View Post</button>
            </Link>
            <button className="delete-btn" onClick={() =>deletePostHandler(post._id)}>delete</button>
        </td>
       </tr>
       
        ))}
       
    </tbody>
</table>
        </div>

        
    
   </div>
     );
}
 
export default PostTable;