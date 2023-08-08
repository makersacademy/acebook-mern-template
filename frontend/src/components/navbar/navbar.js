import React, { useState } from "react";

const NavBar = ({
  isLoggedIn,
  handleLogout,
  handleLogin,
  navigate,
  setSearchQuery,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleOnChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const signUp = () => {
    navigate("/signup");
  };
  const posts = () => {
    navigate("/posts");
  };
  const myPosts = () => {
    navigate("/myPosts");
  };
  const handleSearch = () => {
    const API = `/posts/search?value=${inputValue}`;
    fetch(API, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        await setSearchQuery(data);
        console.log({ data });
      });
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <button onClick={myPosts}>My Posts</button>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={signUp}>Sign Up</button>
          <button onClick={handleLogin}>Login</button>
        </>
      )}
      <button onClick={posts}>Posts</button>
      <input
        type="text"
        placeholder="search"
        onChange={(e) => handleOnChange(e)}
      ></input>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default NavBar;
