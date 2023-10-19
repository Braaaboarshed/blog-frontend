import Sidebar from "../../components/sidebar/Sidebar";
// import "./admin.css
import "./tables.css"
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { posts } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { deleteComment, getAllComment } from "../../redux/apiCalls/commentApiCall";
import { useDispatch, useSelector } from "react-redux";


const CommentTable = () => {

    const dispatch = useDispatch()
    const {comments} = useSelector(state =>state.comment) 
    const deleteCommentHandler =(commentId) =>{
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this comment?",
            icon: "warning",
            dangerMode: true,
        })
        .then(willDelete => {
            if (willDelete) {
              dispatch(deleteComment(commentId))
            }
        });
  
    }

    useEffect(()=>{
        dispatch(getAllComment())
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
      {comments.map((comment,index) => (
       <tr>
        <td className="count">{index+1}</td>
        <td className="username">{comment.username}</td>
        <td className="email">{comment.text}</td>
        <td>
          
            <button className="delete-btn" onClick= { ()=>deleteCommentHandler(comment._id)}>delete</button>
        </td>
       </tr>
       
        ))}
       
    </tbody>
</table>
        </div>

        
    
   </div>
     );
}
 
export default CommentTable;