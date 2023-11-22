import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


const Navbar = ({ navigate }) => {
    return(
        <nav>
                    <Link id="posts" to="posts" onClick={(e) => {e.preventDefault(); navigate("/posts");}}>Posts</Link>
                    <Link id="account" to="account" onClick={(e) => {e.preventDefault(); navigate("/users/my_account");}}>My Account</Link>
                    <form onSubmit={(e) => {e.preventDefault(); }}>
                        <input type="text" placeholder="Search" />
                        <button type="submit">Search</button>
                    </form>
                    <Link id="signup" to="signup" onClick={(e) => {e.preventDefault(); navigate("/signup")}}>Signup</Link>
                    <Link id="logout" to="logout" onClick={(e) => {e.preventDefault();}}>Logout</Link>
        </nav>
    )
}

export default Navbar;
