import { useContext } from "react";
import './nav.css'
import NavButton from '../navbutton/NavButton';

// import logged in context as defined in App.js
import {loggedInContext} from '../app/App';
import { useNavigate } from "react-router";
import Feed from "../feed/Feed";

const NavBar = () => {

// set consts for loggedIn and setLoggedIn (funct) to be accessed within the component
const [loggedIn, setLoggedIn] = useContext(loggedInContext)

const navigate = useNavigate()

const logout = () => {
  window.localStorage.removeItem("token")
  setLoggedIn(false)
  navigate('/login')
}

    return (
      <>
      <div className="nav-container">
          {(loggedIn ?
          <div className="nav-box">
            <h1><i>AceBook</i></h1>

            <button className="post-button" onClick={Feed}>Posts</button>

            <button className="logout-button" onClick={logout}>Logout</button>
          </div>
          :
          <div className="nav-box">
            <h1><i>AceBook</i></h1>
            <div>
              <NavButton className="signup-button" to="/signup" value="Sign-up"/>

              <NavButton className="login-button" to="/login" value="Login"/>
            </div>
          </div>
          )}
      </div>
      </>
    );
}

export default NavBar;