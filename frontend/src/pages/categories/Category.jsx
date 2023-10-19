import "./category.css"
import PostList from "../../components/posts/PostList";
// import { posts } from "../../dummyData";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostByCategory } from "../../redux/apiCalls/postApiCalls";
const Category = () => {

    const dispatch = useDispatch();
    const {category} =useParams()
    // console.log(category)

    useEffect(()=>{
         dispatch(getPostByCategory(category))
        window.scrollTo(0,0);
    },[])

   const {postCate} = useSelector(state => state.post)
   console.log(postCate)

    return ( 
        <section className="category">
            <h1 className="category-title">Posts based on {category}</h1>

        { postCate.length === 0 ?
        <div className="no-result">
           <h2> no posts matched with category of <strong>{category}</strong></h2>
        
           <Link to='/' className="back-link">
           back to home page
           </Link>
        </div>:
<PostList posts={postCate} />

        }

        </section>
     );
}
 
export default Category;