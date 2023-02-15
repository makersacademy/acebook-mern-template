import React, { useState } from "react";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <ul class="nav justify-content-center">
          <div className="logoDiv">
            <li class="nav-item">
              <a href="/home">
                <img
                  src="https://media.geeksforgeeks.org/auth/profile/8ceu3jpotjla4m5wpbm7"
                  alt=""
                  width="30"
                  height="30"
                ></img>
              </a>
            </li>
          </div>
          <li class="nav-item">
            <a href="/user/:id">Profile</a>
          </li>
          <li class="nav-item">
            <a href="/posts">Feed</a>
          </li>
          <li class="nav-item">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Search..."
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </li>
          <li class="nav-item">
            <a href="/signout">Sign out</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;