import React, { useEffect, useState } from "react";
// import { PrimaryNav, MenuLink, Menu, style} from ‘./NavbarElements’
import "./NavBar.css";
import Feed from "../feed/Feed";
import LogInForm from "../auth/LoginForm";
import SignUpForm from "../user/SignUpForm";
import Avatar from "@mui/material/Avatar";
import Post from "../post/Post";

const Navbar = ({ navigate}) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (token !== window.localStorage.getItem("token")) {
      setToken(window.localStorage.getItem("token"));

      const logout = () => {
        window.localStorage.removeItem("token");
        // navigate('/login')
      };

      if (token) {
        return (
          <>
            <nav className="nav-bar">
              <h2>Farcebook</h2>
              <div className="username-format">{username}</div>
              <div className="nav-item" onClick={logout}>
                <a href="/login">Logout</a>
              </div>
            </nav>
          </>
        );
      } else {
        return (
          <>
            <h2>Farcebook</h2>

            <nav className="nav-bar">
              <div className="nav-item">
                <a href="/login">Login</a>
              </div>
              <div className="nav-item">
                <a href="/signup">Sign up</a>
              </div>
            </nav>
          </>
        );
      }
    }
    setUsername(window.localStorage.getItem("username"));
  }, [window.localStorage.getItem("token")]);

  const logout = () => {
    window.localStorage.removeItem("token");
    // navigate('/login')
  };
  if (token) {
    return (
      <>
        {<Avatar alt="Remy Sharp" src= "" sx={{ width: 56, height: 56 }} />}

        <nav className="nav-bar">
          <h2>Farcebook</h2>
          <div className="username-format">{username}</div>
          <div className="nav-item" onClick={logout}>
            <a href="/logout">Logout</a>
          </div>
        </nav>
      </>
    );
  } else {
    return (
      <>
        {
          <Avatar
            alt="Remy Sharp"
            src="https://res.cloudinary.com/dmkipvd8d/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1684179149/800px-Facebook_logo__28square_29_dgjsjn.png"
            sx={{ width: 56, height: 56 }}
          />
        }

        <h2 className="title">Farcebook</h2>
        <nav className="nav-bar">
          <div className="nav-item">
            <a href="/login">Login</a>
          </div>
          <div className="nav-item">
            <a href="/signup">Sign up</a>
          </div>
        </nav>
      </>
    );
  }
};
export default Navbar;
