import PostList from '../../components/posts/PostList';
import './home.css'
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fatahPosts } from "../../redux/apiCalls/postApiCalls";
import { useEffect } from "react";
const Home = () => {
    const dispatch = useDispatch();
    const {posts} = useSelector(state =>state.post)
    console.log(posts)
    useEffect(()=>{
        dispatch(fatahPosts(1))
    },[1])

    return ( 
        
        <section className="home">
            <div className="home-hero-header">
                <div className="home-hero-header-layout">
                    <h1 className="home-title">wellcome to blog</h1>
                </div>
            </div>

            <div className="home-latest-posts">
                <div className="home-container">
                    <PostList posts = {posts} /> 
                        <Sidebar  />
                </div>
            </div>
            <div className="see-all-posts">
                <Link className="text" to='/posts'>
                    See All Posts
                </Link>
            </div>
        </section>
     );
}
 
export default Home;