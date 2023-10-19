import Sidebar from "../../components/sidebar/Sidebar";
// import "./admin.css
import "./tables.css"
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteCategory, fatahCategories } from "../../redux/apiCalls/categoryApiCall";



const CategoryTable = () => {
    const dispatch = useDispatch()
    const deleteCategoryHandler =(categoryId) =>{
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this post?",
            icon: "warning",
            dangerMode: true,
        })
        .then(isOk => {
            if (isOk) {
             dispatch(deleteCategory(categoryId))
            }
        });
    }
    useEffect(()=>{
        dispatch(fatahCategories())
    },[])
    
    const {categories} = useSelector(state => state.category)
    
    return ( 

        
        
        <div className="table-page">
        <AdminSidebar />

     

        <div className="table-container">
        <table>
 <thead>
 <tr>
    <th>Count</th>
    <th>Category Name </th>
    <th>Action</th>
  </tr>

 </thead>

  
  <tbody >
      {categories.map((category,index) => (
       <tr key={category._id}>
        <td className="count">{index+1}</td>
        <td className="username">{category?.title}</td>
        
        <td>
        
            <button className="delete-btn" onClick={()=> deleteCategoryHandler(category._id)}>delete</button>
        </td>
       </tr>
       
        ))}
       
    </tbody>
</table>
        </div>

        
    
   </div>
     );
}
 
export default CategoryTable;