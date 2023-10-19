import './post-page.css';
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import Pagination from '../../components/pagination/pagination';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fatahPosts, getPostCount , getPostByCategory } from "../../redux/apiCalls/postApiCalls";
import { useParams } from 'react-router-dom';
const PostsPage = () => {
  
  
  const dispatch = useDispatch()
  const [currentPage,setCurrentPage] = useState(1)
  
  const POSTS_PER_PAGE =  3
  const {postsCount , posts} = useSelector(state =>state.post)
  const pages = Math.ceil(postsCount / POSTS_PER_PAGE)
  const param = useParams();

  console.log(param.categories)

  useEffect(()=>{
    dispatch(fatahPosts(currentPage))
  window.scrollTo(0,0)
  },[currentPage])



  useEffect(()=>{
    dispatch(getPostCount())
    // dispatch(getPostByCategory())
  },[])




  return (
    
      <>
       <div className="post-page">
         <PostList posts = {posts} /> 
        <Sidebar  />
       </div>
        <Pagination 
        pages = {pages} 
        currentPage = {currentPage}
        setCurrentPage ={setCurrentPage}
        />
      
      </>
     );
 }
  
 export default PostsPage;