import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ navigate }) => {
const [input, setInput] = useState("");
const [searchResults, setSearchResults] = useState([]);


const handleSearch = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`/users/usernames?q=${input}`);
    const data = await response.json();
    
    // Limit the number of results to 6
    const limitedResults = data.slice(0, 6);

    setSearchResults(limitedResults);
  } catch (error) {
    console.error("Error fetching usernames:", error);
  }
}
const handleInput = async (e) => {
  e.preventDefault();
  setInput(e.target.value);
  
}

useEffect(() => {
  // TODO: Fetch data from the database based on the input value
  // Update setSearchResults with the matching usernames
  if (input === "") {
    setSearchResults([]);
  }
}, [input]);



  if (window.localStorage.getItem("token")) {
    //checks if token exists/logged in
    return (
      <nav>
        <div className="navbar-logo">
          <Link
          id="acebook"
          to="acebook"
          onClick={(e) => {
            e.preventDefault();
            navigate("/../")
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

        <Link
          id="account"
          to="account"
          onClick={(e) => {
            e.preventDefault();
            navigate("/users/my_account");
          }}
        >
          My Account
        </Link>

        
        <form
          onSubmit={handleSearch}
          className="search-form"
        >
          <input type="text" placeholder="Enter username" value={input} onChange={handleInput} />
          <button className="search-button" type="submit">Search</button>
          {searchResults.length > 0 && input.length > 0 && (
            <div className="dropdown">
              <ul>
                {searchResults.map((result) => (
                  <li key={result._id}>
                    <Link to={`/profile/${result._id}`}>{result.username}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
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
