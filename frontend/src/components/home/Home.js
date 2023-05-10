import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../user/SignUpForm';
import './Home.css';

const Home = () => {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-brand">Welcome To Acebook</div>
        <ul className="navbar-nav">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <SignUpForm />
    </div>
  );
}

export default Home;
