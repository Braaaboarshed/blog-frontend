import {Link} from 'react-router-dom'
import   {useSelector}  from "react-redux";
const Navbar = (toggle,setToggle) => {
 const {user} = useSelector(state =>state.auth)   

    return ( 
        <nav className="navbar" style={{clipPath:toggle.toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)"}} >
                <ul className="nav-links" >
                        
                    <Link to='/' className="nav-link"
                    onClick={()=>toggle.setToggle(prev =>!prev)}
                   >
                <i class="bi bi-house-door"
                
                ></i>
                        Home
                    </Link>
                    <Link to='/posts' className="nav-link"
                     onClick={()=>toggle.setToggle(prev =>!prev)}
                     >
                    <i class="bi bi-stickies"></i>
                    Posts
                    </Link>
                   {user ?
                    <Link to='/posts/create-posts' className="nav-link"
                    onClick={()=>toggle.setToggle(prev =>!prev)}
                    >
                    <i class="bi bi-file-plus"
                    ></i>
                        Create Posts
                    </Link> :null}


                    {user?.isAdmin ?
                <Link to='admin-dashboard' className="nav-link"
                onClick={()=>toggle.setToggle(prev =>!prev)}
                >
                <i class="bi bi-person-circle"></i>
                    Admin Dashboard
                </Link> :null    
                }

                </ul>
            </nav>
     );
}
 
export default Navbar;