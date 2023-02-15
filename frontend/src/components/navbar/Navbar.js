import React, { useState } from "react";
import './Navbar.css';


const Navbar = () => {
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
    <nav class="navbar navbar-expand-lg bg-light rounded">
      <div class="container-fluid">
        <div class="collapse navbar-collapse d-lg-flex">
          <a class="navbar-brand col-lg-3 me-0" href="/">
            Acebookers
          </a>
          <ul class="navbar-nav col-lg-6 justify-content-lg-center">
            <li class="nav-item">
              <a href="/user/:id">
                <button className="btn btn-outline-primary" type="submit">
                  <i className="bi bi-person-square"></i>
                  <span> Profile</span>
                </button>
              </a>
            </li>
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
          <div class="d-lg-flex col-lg-3 justify-content-lg-end">
            <a href="/logout">
              <button class="btn btn-outline-dark">
                <i class="bi bi-box-arrow-right"></i>
                <span>Sign Out</span>
              </button>
            </a>
          </div>
        </div>
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