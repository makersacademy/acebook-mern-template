import React, { useEffect, useState } from 'react';
import "./Navbar.css";
import { Link, Navigate } from 'react-router-dom';

const Navbar = ({ logoutHandle, token }) => {

    // Navbar uses classes from boostrap for basic styling

    return (
        <>
            <nav id='navBar' className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a id="logo" className="navbar-brand" href="/">Acebook</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {token ? 
                    <input id='searchBar' type='text' className='form-control' placeholder='🔍 Search Acebook' aria-label='Search Acebook' aria-describedby='basic-addon1' />
                    : null }
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        {/* Conditional operator to check if a token exists to decide which buttons to render */}
                        {token ?
                            // If token exists, renders the logout button which calls logoutHandle on click
                            <div id='buttonContainer'>
                                <Link to="/">
                                    <button id='buttonLogOut' type='button' className='btn btn-outline-primary' onClick={logoutHandle}>Log Out</button>
                                </Link>
                            </div>
                            :
                            // If token doesn't exist, render the login and signup buttons
                            <div id='buttonContainer'>
                                <Link to="/login">
                                    <button id='buttonLogin' type='button' className='btn btn-outline-primary' href='/login'>Login</button>
                                </Link>
                                <Link to="/signup">
                                    <button id='buttonSignUp' type='button' className='btn btn-outline-primary' href='/signup'>Sign Up</button>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;

{/* <li className="nav-item">
    <a className="nav-link" href="login">Login</a>
</li>
<li className="nav-item">
    <a className="nav-link" href="signup">Signup</a>
</li> */}