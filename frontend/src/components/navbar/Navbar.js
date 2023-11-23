import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ navigate }) => {

  if (window.localStorage.getItem("token")) {
    //checks if token exists/logged in
    return (
      <nav>
        <div className="logo">
          <Link
          id="acebook"
          to="acebook"
          onClick={(e) => {
            e.preventDefault();
            navigate("/")
          }}>
            Acebook
            </Link>
          </div>
        <Link
          id="posts"
          to="posts"
          onClick={(e) => {
            e.preventDefault();
            navigate("/posts");
          }}
        >
          Posts
        </Link>

        {/* UNCOMMENT WHEN IMPLEMENTING MY ACCOUNT */}
        {/* <Link
          id="account"
          to="account"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          My Account
        </Link> */}

        {/*  UNCOMMENT WHEN IMPLEMENTING SEARCH BAR */}
        {/* <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input type="text" placeholder="Search" />
          <button type="submit">Search</button>
        </form> */}
        <Link
          id="logout"
          to="logout"
          onClick={(e) => {
            e.preventDefault();
            window.localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Logout
        </Link>
      </nav>
    );
  } else {
    return (
      <nav>
        <div className="logo">
          <Link
          id="acebook"
          to="acebook"
          onClick={(e) => {
            e.preventDefault();
            navigate("/")
          }}>Acebook</Link>
          </div>
      </nav>
    );
  }
};


export default Navbar;
