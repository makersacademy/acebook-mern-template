 import React from 'react';
import { Link } from 'react-router-dom';

 const Navigation = () => {
  return (
   <nav>
      <ul>
         <li className="dropdown">
           <a href="/" className="dropbtn">Dropdown</a>
           <div className="dropdown-content">
            <Link to="/login">logout</Link>
         </div>
        </li>
      </ul>
    </nav>  



    );
 };

  export default Navigation;
