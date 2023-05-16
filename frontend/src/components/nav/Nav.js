import { useContext } from "react";
import './nav.css'
import NavButton from '../navbutton/NavButton';

// import logged in context as defined in App.js
import {loggedInContext} from '../app/App';
import { useNavigate } from "react-router";

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
            <h1>Title</h1>
            <NavButton to="/posts" value="Posts"/>

            <button className="logout-button" onClick={logout}>Logout</button>
          </div>
          :
          <div className="nav-box">
            <h1>Title</h1>
            <NavButton to="/signup" value="Sign-up"/>

            <NavButton to="/login" value="Login"/>
          </div>
          )}
      </div>
      </>
    );
}

export default NavBar;