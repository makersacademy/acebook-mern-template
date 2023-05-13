import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css"


const Home = () => {
  return (
    <div className='container'>
      <h1>Acebook</h1>
      <br/>
      
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Log In</Link></li>
    
    </div>
  
  );
};
  
export default Home;