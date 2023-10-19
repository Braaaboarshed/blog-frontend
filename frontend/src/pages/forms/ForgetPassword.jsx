import { Link } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import  {ToastContainer, toast} from "react-toastify"
const ForgetPassword = () => {

 
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");

    const formSubmitHandler = (e)=>{
        e.preventDefault()
        if(email.trim() === "") return toast.error('enter valid email')    
    }

    return ( 
        <div className="form-container">
            <ToastContainer/>
            <h1 className="form-title">Forget Password</h1>
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

         
                <button className="form-btn" type="submit">submit</button>

             
            </form>
       
        </div>
     );
}
 
export default ForgetPassword;