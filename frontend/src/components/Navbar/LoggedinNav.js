import React from 'react';
import { Link } from "react-router-dom";

const loggedinnavbar= () =>{
  return (
  <div>
    <li>
      <Link to="/login">Sign Out
      </Link>
    </li>
  </div>
  );
}
export default loggedinnavbar;