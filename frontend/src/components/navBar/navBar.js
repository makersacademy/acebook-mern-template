import React from 'react';
import './navBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return(
        <>
            <nav className='nav'>
                <div class='nav-container'>
                    <Link to="/" className='site-title'>AceBook</Link>
                    <ul>
                        <CustomLink href="/login">Login</CustomLink>
                        <CustomLink href="/signup">Sign-up</CustomLink>
                        <CustomLink href="/posts">Posts</CustomLink>
                        {console.log(window.localStorage)}
                    </ul>
                </div>
            </nav>
        </>
    )
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