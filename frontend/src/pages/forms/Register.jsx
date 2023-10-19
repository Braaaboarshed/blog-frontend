import { Link ,useNavigate} from "react-router-dom";
import "./login.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  {ToastContainer, toast} from "react-toastify"
import swal from "sweetalert";
import { register } from "../../redux/apiCalls/authApiCalls";
// import state from "sweetalert/typings/modules/state";
const Register = () => {

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");

    const dispatch = useDispatch()
    const {registerMessage} = useSelector((state) => state.auth)

    const formSubmitHandler = (e)=>{
        e.preventDefault()
        if(username.trim() === "") return toast.error('enter valid username')    
        if(email.trim() === "") return toast.error('enter valid email')    
        if(password.trim() === "") return toast.error('enter valid password')    
        dispatch(register({username,email,password}))
    }  

    const navigate =useNavigate();
     if(registerMessage){
        swal({
            title : registerMessage,
            icon :'success'
        }).then((isOk=>{
            if(isOk)
            navigate('/login')
        }))
     }

    return ( 
        <div className="form-container">
            <ToastContainer/>
            <h1 className="form-title">Register</h1>
            <form  className="login-form" onSubmit={formSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="">Enter your username</label>
                    <input
                     type="text"
                      className="form-input"
                      id="username"
                      placeholder="username"
                      value={username}
                      onChange={(e)=>setUsername(e.target.value)}
                    />       
                </div>

                <div className="form-group">
                    <label htmlFor="">Enter your  email   </label>
                    <input
                     type="email"
                      className="form-input"
                      id="email"
                      placeholder="email  "
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                    />       
                </div>

                <div className="form-group">
                    <label htmlFor="">Enter your password</label>
                    <input
                     type="password"
                      className="form-input"
                      id="password"
                      placeholder="password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                    />   

                </div>
       

                <button className="form-btn" type="submit">Register</button>
         
            </form>
       
        </div>
     );
}
 
export default Register;