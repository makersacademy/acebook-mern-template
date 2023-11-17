import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


const Navbar = ({ navigate }) => {
    if(window.localStorage.getItem("token") != null) //checks if token exists/logged in
    {
    return(
        <nav>
                    <div className="logo">Acebook</div>
                    <Link id="posts" to="posts" onClick={(e) => {e.preventDefault(); navigate("/posts");}}>Posts</Link>
                    <Link id="account" to="account" onClick={(e) => {e.preventDefault();}}>My Account</Link>
                    <form onSubmit={(e) => {e.preventDefault(); }}>
                        <input type="text" placeholder="Search" />
                        <button type="submit">Search</button>
                    </form>
                    <Link id="logout" to="logout" onClick={(e) => {e.preventDefault(); window.localStorage.removeItem("token");}}>Logout</Link>
                    
        </nav>
    )
    }
    else{
        return(
        <nav>
            <div className="logo">Acebook</div>
        </nav>

        )
    }
}


export default Navbar;

