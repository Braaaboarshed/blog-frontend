import { Link } from "react-router-dom";
import "./admin.css"
const AdminSidebar = () => {
    return ( 
       <section className="sidebar-dashboard">
        <h4 className="side-title">Dashboard</h4>
        <ul className="navbar-list">
           <Link to="/admin-dashboard/users-table">
           <li className="nav-link">
                
                <i class="bi bi-people-fill"></i>
                Users
                </li>
           </Link>

           <Link to="/admin-dashboard/posts-table">
            <li className="nav-link">
            <i class="bi bi-stickies-fill"></i>
                Post
             </li>
            </Link>

            <Link to="/admin-dashboard/category-table">
            <li className="nav-link">
            <i class="bi bi-bookmarks-fill"></i>                
                Categories
            </li>
            </Link>
            
            <Link to="/admin-dashboard/comment-table">
            <li className="nav-link">
            <i class="bi bi-chat-left-text-fill"></i>
                Comments
                </li>
            </Link>
          
        </ul>
       </section>
     );
}
 
export default AdminSidebar;