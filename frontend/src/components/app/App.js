import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React from "react";
import Feed from '../feed/Feed'
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";
import NavBar from '../nav/Nav';
import { useState, createContext, useEffect } from "react";
import ReactDOM from "react-dom/client";

export const loggedInContext = createContext();

const App = () => {
    const [loggedIn, setLoggedIn] = useState();


    // fires on reload of the app (F5). Normally react would lose the context (loggedIn)
    // This checks for a token in local storage and sets logged in to true if found
    useEffect(() => {
    if (window.localStorage.getItem("token")) {
      setLoggedIn(true);
    }
    }, []);

    // changes the localStorage value of loggedIn when loggedIn context changes
    useEffect(() => {
      window.localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
    }, [loggedIn]);

    return (
    // loggedInContext.Proider wraps all its child components and passes down the
    // values (in this case, loggedIn and setLoggedIn). See Nav.js for how to access them.
    <loggedInContext.Provider value={[loggedIn, setLoggedIn]}>
      <NavBar />
        <Routes>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          {/* <Route path='/account' element={<Account navigate={ useNavigate() }/>}/> */}
        </Routes>
    </loggedInContext.Provider>
    );
}

export default App;
