import React, { useEffect, useState } from "react";
import "./NavBar.css";
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
      }
    }
    setUsername(window.localStorage.getItem("username"));
  }, [window.localStorage.getItem("token")]);
  
  const logout = () => {
      window.localStorage.removeItem("token");
      //navigate('/login')
    };
    
  let contextButton;
  
  if (token) {
    contextButton = <div className="nav-item" onClick={logout}>
      <a href="/login">Logout</a>
        {/*/<Avatar alt="Remy Sharp" src= "" sx={{ width: 56, height: 56 }} />*/}

    </div>
    } else if (window.localStorage.getItem("app-route") === "login") {
      contextButton = <div className="nav-item">
                        <a href="/signup">Sign up</a>
                      </div>
    } else if (window.localStorage.getItem("app-route") === "signup") {
      contextButton = <div className="nav-item">
                        <a href="/login">Login</a>
                      </div>
    }
  
    return (
      <nav>
        <div className="navbar">
          <div className="nav-left">
            <Avatar
              alt="Remy Sharp"
              src="https://res.cloudinary.com/dmkipvd8d/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_30px_solid_white,b_rgb:262c35/v1684179149/800px-Facebook_logo__28square_29_dgjsjn.png"
              sx={{ width: 56, height: 56 }}
            />
        
            <h1 className="title">Farcebook</h1>
          </div>
          <div className="nav-right">
            { contextButton }
          </div>
        </div>
      </nav>
    );
  }
// };
export default Navbar;
