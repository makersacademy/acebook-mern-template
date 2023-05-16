import { useEffect, useContext } from "react";
import './nav.css'
import NavButton from '../navbutton/NavButton';
import {loggedInContext} from '../app/App';

const NavBar = () => {

const [loggedIn, setLoggedIn] = useContext(loggedInContext)
 
useEffect(() => {
  console.log(loggedIn)
}, [loggedIn])

    return (
      <>
      <div className="nav-container">
          {(loggedIn ?
          <div className="nav-box">
            <h1>Title</h1>
            <NavButton to="/posts" value="Posts"/>

            <NavButton to="/logout" value="Logout"/>
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