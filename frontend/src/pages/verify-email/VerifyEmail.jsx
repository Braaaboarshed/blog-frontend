import { Link } from "react-router-dom";
import './verify-email.css'
const VerifyEmail = () => {
    const isVerifyEmail = true
    return ( 
        <section className="verify-email">
            {isVerifyEmail ? <>
                <i className="bi bi-patch-check verify-email-icon"></i>
                <h1 className="verify-email-text">
                    Your email address has been verified successfully
                </h1>

                <Link className="verify-email-link" to='/login'>
                    Go to login page
                </Link>
            </> : <></>}
        </section>
     );
}
 
export default VerifyEmail;