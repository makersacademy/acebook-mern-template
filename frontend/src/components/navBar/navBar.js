import React, { useEffect } from 'react';
import './navBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
    let token = window.localStorage.getItem("token");

    useEffect(() => {
        token = window.localStorage.getItem("token");
    });

    if (token) {
        return(
            <>
                <nav className='nav'>
                    <div className='nav-container'>
                        <Link to="/" className='site-title'>AceBook</Link>
                        <ul>
                            <CustomLink to="/posts">Posts</CustomLink>,
                            <Link to="/login" onClick={() => window.localStorage.removeItem("token")}>Logout</Link>  
                        </ul>
                    </div>
                </nav>
            </>
        )
    } else {
        return(
            <>
                <nav className='nav'>
                    <div className='nav-container'>
                        <Link to="/" className='site-title'>AceBook</Link>
                        <ul>
                            <CustomLink to="/login">Login</CustomLink>,
                            <CustomLink to="/signup">Sign-up</CustomLink>   
                        </ul>
                    </div>
                </nav>
            </>
        )
    }
}

const CustomLink = ({to, children}) => {
    const path = window.location.pathname;
    return (
        <li className={path === to ? 'active' : ''}>
            <Link to={to}>
                {children}
            </Link>
        </li>
    )
}

export default NavBar;