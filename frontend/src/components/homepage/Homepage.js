import Feed from "../feed/Feed";
import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import '../homepage/homepage.css'
import { Link, Navigate } from 'react-router-dom';


const Homepage = (props) => {
    const { userInfo } = useContext(UserContext);

    return (
        <>
            {userInfo ?
                <Feed navigate={props.navigate} />
                :
                <>
                    <video id="video-background" autoPlay muted loop>
                        <source src="https://makers.tech/wp-content/uploads/2018/06/makers-video.mp4" type="video/mp4"></source>
                    </video>
                    <div className="recentLogins">
                        <div className="logo">
                            <h1>Recent Logins</h1>
                        </div>
                        <div className="instructions">Click your picture or add an account.</div>
                        <div className="recentLogins_Profiles">
                            <div className="addNewProfile">
                                <a className="newProfile" href="/login">
                                    <div className="addAccountLabel">Add Account</div>
                                </a>
                            </div>
                        </div>w
                    </div>

                    <div id="homepage">
                        <div className="loginForm">
                            <form>
                                <input type="email" id="email" name="email" className="form-input" placeholder="Email Address" required></input>
                                <input type="password" id="password" name="password" className="form-input" placeholder="Password" required></input>
                                <button type="submit" className="buttonLogin">Login</button>
                                <a className="linkForgottenPassword" href="/forgot-password">Forgotten password?</a>
                                <div className="lineBreak"></div>
                                <Link to="/signup">
                                    <button type="button" className="buttonSignUp" href="/signup">Sign Up</button>
                                </Link> 
                            </form>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Homepage;