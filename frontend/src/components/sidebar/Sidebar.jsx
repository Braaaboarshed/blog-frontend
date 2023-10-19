import './sidebar.css'
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fatahCategories } from '../../redux/apiCalls/categoryApiCall';
const Sidebar = () => {

    const dispatch = useDispatch()
    const {categories}  = useSelector(state => state.category)
    
    useEffect( ()=>{
        dispatch(fatahCategories())
    },[])



    return ( 
        <div className="sidebar">
            <h5 className="sidebar">CATEGORIES</h5>
            <ul className="sidebar-links">
                {categories.map((category)=>(
                    <Link
                    className="sidebar-link"
                    key={category?.id}
                    to = {`/posts/category/${category?.title}`}
                    >
                        {category?.title}
                    </Link>
                ))};
            </ul>
        
        </div>


)
}
export default Sidebar;
                