import React, { useState } from "react";
import './Navbar.css';
// need to add padding to nav.css file and choose colours 
//add padding top to logo
// make signout button float to other side of page
const Navbar = () => {
  return (
    <nav className=" bg-body-tertiary">
      <div className="container-fluid">
        <div className="logoDiv">
          <a className="navbar-brand" href="/home">
            <img
              src="https://media.geeksforgeeks.org/auth/profile/8ceu3jpotjla4m5wpbm7"
              alt=""
              width="30"
              height="30"
            ></img>
          </a>
        </div>
        <ul className="nav justify-content-center">
          <a href="/user/:id">
            <button class="btn btn-outline-primary" type="submit"> 
              <i class="bi bi-person-square"></i>
              <span> Profile</span>
            </button>
          </a>

          <li class="nav-item">
            <a href="/posts">
              <button class="btn btn-outline-primary" type="submit">
                <i class="bi bi-chat-square-text"></i>
                <span> Feed</span>
              </button>
            </a>
          </li>
          <li class="nav-item">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Search..."
              />

              <button class="btn btn-primary" type="submit">
                <span>Search</span>
              </button>
            </form>
          </li>
          <li class="nav-item">
            <a href="/signout">
              <button class="btn btn-outline-secondary" type="submit">
                Sign out
              </button>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;