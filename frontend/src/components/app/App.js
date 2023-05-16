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
import { useState, createContext } from "react";
import ReactDOM from "react-dom/client";

export const loggedInContext = createContext();

const App = () => {
    const [loggedIn, setLoggedIn] = useState();
    return (
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
