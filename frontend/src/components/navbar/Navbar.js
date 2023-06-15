import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

  return (
    <div className='navbar-container'>
        {/* lotr related stuff */}
        <div>
           <h1 className='header'>The Trelloship of the String</h1>
        </div>

        <ul className="links-container">  
            <Link className='link' to={'./Logout'}>
                <li>Log out</li>
            </Link>
        </ul>
    </div>
  )
}

export default Navbar