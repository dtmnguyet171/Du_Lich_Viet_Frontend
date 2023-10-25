import { Link } from "react-router-dom";
import video from "./../assets/images/vd_login.mp4";
import { AiOutlineUser, AiOutlineSwapRight, AiFillMail } from 'react-icons/ai';
import { BsFillShieldLockFill } from 'react-icons/bs';

const Register = () => {
    return(
        <>
        <div className="loginPage flex">
            <div className="container flex">
                <div className="videoDiv">
                <video src={video} loop muted autoPlay typeof="video/mp4"></video>
              
                <div className="textDiv">
                    <h2 className="title">Start Your Journeys</h2>
                    <p>Enjoy Wonderful Holiday</p>
                </div>
                <div className="footerDiv flex">
                    <span className="text">Have an Account?</span>
                    <Link to="/login"><button className="btn">LogIn</button></Link>
                </div>
                </div>
                <div className="formDiv flex">

                    <form action="" className="form grid">
                        <h3>Become Our Member!</h3>
                        <div className="inputDiv">
                            <label htmlFor="email">Email</label>
                            <div className="input flex">
                                <AiFillMail className="icon"/>
                                <input type="email" id="email" placeholder="Enter Email"/>
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <AiOutlineUser className="icon"/>
                                <input type="text" id="username" placeholder="Enter Username"/>
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className="icon"/>
                                <input type="password" id="password" placeholder="Enter password"/>
                            </div>
                        </div>
                        <button type="submit" className="btn flex">
                            <span>Register</span>
                            <AiOutlineSwapRight className="icon"/>
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
export default Register;