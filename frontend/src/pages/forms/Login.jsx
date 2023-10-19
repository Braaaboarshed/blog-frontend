import { Link } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import {useDispatch } from "react-redux"
import  {ToastContainer, toast} from "react-toastify"
import { loginUser } from "../../redux/apiCalls/authApiCalls";


const Login = () => {

    
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");
    const dispatch = useDispatch(); 
    
    const formSubmitHandler = (e)=>{
        e.preventDefault()
        if(email.trim() === "") return toast.error('enter valid email')    
        if(password.trim() === "") return toast.error('enter valid password')    
        
        dispatch(loginUser({email,password}))
    }
    
    return ( 
        <div className="form-container">
            <ToastContainer/>
            <h1 className="form-title">Login</h1>
            <form  className="login-form" onSubmit={formSubmitHandler}>
              

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

                <button className="form-btn" type="submit">Login</button>
                <p>Did you forget password ? <Link to='/forget-password'>Forget Password</Link></p>
            </form>
       
        </div>
     );
}
 
export default Login;