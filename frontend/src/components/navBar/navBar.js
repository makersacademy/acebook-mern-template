import React, { useEffect, useState } from 'react';
import './navBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    return(
        <>
            <nav className='nav'>
                <div class='nav-container'>
                    <Link to="/" className='site-title'>AceBook</Link>
                    <ul>
                        { token ? 
                            [
                                <CustomLink href={window.localStorage.token ? "/posts" : "/login"}>Posts</CustomLink>
                            ] : [
                                <CustomLink href="/login">Login</CustomLink>,
                                <CustomLink href="/signup">Sign-up</CustomLink>
                            ]
                        }    
                    </ul>
                </div>
            </nav>
        </>
    )
}

const logout = () => {
    window.localStorage.removeItem("token")
}

const CustomLink = ({ href, children}) => {
    const path = window.location.pathname;
    return (
        <li className={path === href ? 'active' : ''}>
            <Link to={href}>
                {children}
            </Link>
        </li>
    )
}

export default NavBar;