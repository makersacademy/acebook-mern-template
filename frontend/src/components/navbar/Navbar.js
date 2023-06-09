import './Navbar.css';
import React from "react";

const Navbar = () => {
    return(
        <header className="navbar">
        <h1>Acebook</h1>
        <div className="navbar-list">
            <ul>
                <li><a>My Page</a></li>
                <li><a>Posts</a></li>
                <li><a>Logout</a></li>
            </ul>
        </div>
    </header>
    )
};

export default Navbar;