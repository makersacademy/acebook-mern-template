import React, { useState } from "react";


const NavBar = ({
  token,
  setToken,
  setPosts,
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

  const logout = () => {
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("username")
    navigate('/login')
  }

  const login = () => {
    navigate('/login')
  }

  const posts = () => {
  
    if (token) {
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
        });
    }
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
        console.log(data)
        await setSearchQuery(data.posts);
        console.log({ data });
      });
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <button onClick={myPosts}>My Posts</button>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={signUp}>Sign Up</button>
          <button onClick={login}>Login</button>
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
