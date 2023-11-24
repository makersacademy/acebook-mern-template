import { Link, useMatch, useResolvedPath,} from "react-router-dom"
import './Navbar.css' ;
import React from 'react';

const Navbar = ({navigate}) => {
  const logout = () => { 
    window.localStorage.clear();
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("token");
  };
  return (
    <nav className="nav">
      <Link to="/posts" className="site-title">
        Acebook
      </Link>
      <ul>
        <CustomLink to="/profile">Profile</CustomLink>
        <CustomLink to="/posts">Feed</CustomLink>
        <CustomLink to="/login" onClick={logout}> Sign out</CustomLink>
      </ul> 
    </nav>
  )
}

const CustomLink = ({ to, children, ...props }) => {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

export default Navbar;
