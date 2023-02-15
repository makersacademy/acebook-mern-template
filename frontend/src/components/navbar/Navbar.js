import React, { useState } from "react";
import './Navbar.css';

// make signout button float to other side of page
const Navbar = () => {// need to add padding to nav.css file and choose colours 
//add padding top to 
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    fetch(`/search?q=${encodeURIComponent(searchTerm)}`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data);
      })
      .catch(error =>{
        console.log(error);
      });
    }
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
            <button className="btn btn-outline-primary" type="submit">
              <i className="bi bi-person-square"></i>
              <span> Profile</span>
            </button>
          </a>

          <li className="nav-item">
            <a href="/posts">
              <button className="btn btn-outline-primary" type="submit">
                <i className="bi bi-chat-square-text"></i>
                <span> Feed</span>
              </button>
            </a>
          </li>
          <li className="nav-item">
            <form
              onSubmit={handleSearchSubmit}
              className="d-flex"
              role="search"
            >
              <input
                className="form-control me-2"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />

              <button className="btn btn-primary" type="submit">
                <span>Search</span>
              </button>
            </form>
          </li>
        </ul>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <a href="/signout">
              <button className="btn btn-outline-secondary" type="submit">
                Sign out
              </button>
            </a>
          </li>
        </ul>
        {searchResults.length > 0 && (
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                <p>{result.firstName}</p>
                <p>{result.lastName}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;