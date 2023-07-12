import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/" id="fb">FB</Link></li>
        <li id="space1"></li>
        <li><Link to="/" id="home" className="tooltip active" data-tooltip="Home">Home</Link></li>
        <li><Link to="/" id="group" className="tooltip" data-tooltip="My Groups">Groups</Link></li>
        <li><Link to="/" id="tv" className="tooltip" data-tooltip="Videos on Watch">Watch</Link></li>
        <li><Link to="/" id="friend" className="tooltip" data-tooltip="Friend Requests">Friends</Link></li>
        <li id="space2"></li>
        <li><button id="search_btn">Search</button></li>
        <li><button id="btn_plus">+</button></li>
        <li><button id="btn_msg">Messages</button></li>
        <li><button id="btn_bell">Notifications</button></li>
        <li><button id="btn_profile">Profile</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
