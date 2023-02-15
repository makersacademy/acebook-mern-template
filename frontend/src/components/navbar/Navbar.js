import React, { useState } from "react";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <ul>
        <div className="logoDiv">
          <li>
            <a href="/home">
              <img src="blank.jpg" alt=""></img>
            </a>
          </li>
        </div>
        <li class="nav-item">
          <a href="/user/:id">Profile</a>
        </li>
        <li class="nav-item">
          <a href="/posts">Feed</a>
        </li>
        <li>
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
        <li>
          <a href="/signout">Sign out</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;