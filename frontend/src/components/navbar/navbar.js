import React, { useState } from "react";

const NavBar = () => {
  const [signUp, changeSignUp] = useState("");
  const [logIn, changeLogIn] = useState("");
  const [signOut, changeLogOut] = useState("");
  const [myInfo, changedIfLogged] = useState("");

  //maybe the navbar is a component made up of all of these individual components so on the app.js it looks like this ---
  //<navbar>
  //      <sign in/>
  //      <log out/>
  //      <see posts/>
  //      <search bar/>
  //<navbar />
  //in this navigation bar we need,
  // take to signup - if state not logged in
  // take to login if state - not logged in
  //take to log out if state - logged in
  //take to my posts - if  state - logged in
  //take to all posts
  // search bar that allows you to search for a username and returns the users posts that you have typed in
};

export default NavBar;
