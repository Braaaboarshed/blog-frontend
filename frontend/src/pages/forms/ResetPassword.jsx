import { Link } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import  {ToastContainer, toast} from "react-toastify"
const ResetPassword = () => {

 
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");

    const formSubmitHandler = (e)=>{
        e.preventDefault()
        if(email.trim() === "") return toast.error('enter valid email')    
        if(password.trim() === "") return toast.error('enter valid password')    
    }

    return ( 
        <div className="form-container">
            <ToastContainer/>
            <h1 className="form-title">Reset Password</h1>
            <form  className="login-form" onSubmit={formSubmitHandler}>
              


                <div className="form-group">
                    <label htmlFor="">Enter your new password</label>
                    <input
                     type="password"
                      className="form-input"
                      id="password"
                      placeholder="new password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                    />   

                </div>
                <div className="form-group">
                <button className="form-btn" type="submit">Submit</button>
                </div>

            </form>
       
        </div>
     );
}
 
export default ResetPassword;