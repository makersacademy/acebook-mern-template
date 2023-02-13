import React from 'react';
import './navBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return(
        <>
            {/* <div class="topnav">
                <div id="logo">
                    <h1>ACEBOOK</h1>
                </div>
                <div class="topnav-right">
                    <a href="/">Home</a>
                    <a href="/login">Login</a>
                    <a href="/signup">Sign-Up</a>
                    <a href="/posts">Posts</a>
                </div>
                {window.location.pathname}
            </div> */}

            <nav className='nav'>
                <div class='nav-container'>
                    <Link to="/" className='site-title'>AceBook</Link>
                    <ul>
                        <CustomLink href="/login">Login</CustomLink>
                        <CustomLink href="/signup">Sign-up</CustomLink>
                        <CustomLink href="/posts">Posts</CustomLink>
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