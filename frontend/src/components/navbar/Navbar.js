import './Navbar.css';
import React from "react";

const Navbar = () => {
    return(
        <header data-cy="navbar" className="navbar">
        <h1>Acebook</h1>
        <div className="navbar-list">
            <a>My Page</a>
            <a>Posts</a>
            <a>Logout</a>
        </div>
    </header>
    )
};

export default Navbar;