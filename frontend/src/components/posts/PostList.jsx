import PostItem from "./PostItem";

const PostList = ({posts}) => {
    return ( 
        <div className="post-list">
            
           <div className="post-list-category" >
           {posts.map(item=><PostItem post={item} key={item.id} />)}
           </div>
         </div>
     );
}
 
export default PostList;