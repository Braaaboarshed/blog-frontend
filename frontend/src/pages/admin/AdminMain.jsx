import { useDispatch, useSelector } from "react-redux";
import AddCategoryForm from "./AddCategoryForm";
import "./admin.css"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fatahCategories } from "../../redux/apiCalls/categoryApiCall";
import { getAllProfiles } from "../../redux/apiCalls/profileApiCalls";
import { getPostCount } from "../../redux/apiCalls/postApiCalls";


const AdminMain = () => {
     
    const {postCount} = useSelector(state => state.post)
    const {profiles} = useSelector(state => state.profile)
    
    const {categories} = useSelector(state => state.category)
    const {comments} = useSelector(state => state.comment)

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fatahCategories())
        dispatch(getAllProfiles())
        dispatch(getPostCount())
    },[])


    return ( 
        <div className="admin-main">
            <div className="main-container">
                <div className="main-card">
                    <h5 className="card-title">Users</h5>
                    <p className="card-count">{profiles.length}</p>
                    <div className="card-button">
                        <Link to="users-table">
                        <button className="card-btn">See all users</button>
                        </Link>
                        <i class="bi bi-people"></i>
                    </div>
                </div>

                <div className="main-card">
                    <h5 className="card-title">Posts</h5>
                    <p className="card-count">{postCount}</p>
                  <Link to="posts-table">
                  <div className="card-button">
                        <button className="card-btn">See all Posts</button>
                        <i class="bi bi-stickies"></i>
                    </div>
                  </Link>
                </div>

                <div className="main-card">
                    <h5 className="card-title">Categories</h5>
                    <p className="card-count">
                        {categories?.length}
                    </p>
                   <Link to="category-table">
                   <div className="card-button">
                        <button className="card-btn">See all Categories</button>
                        <i class="bi bi-bookmarks"></i>
                    </div>
                   </Link>
                </div>

                <div className="main-card">
                    <h5 className="card-title">Comments</h5>
                    <p className="card-count">{comments.length}</p>
                    <div className="card-button">
                       <Link to="comment-table">
                       <button className="card-btn">See all Cmments</button>
                       </Link>
                        <i class="bi bi-chat-left-text"></i>
                    </div>
                </div>


            </div>
            <AddCategoryForm/>
        </div>
     );
}
 
export default AdminMain;