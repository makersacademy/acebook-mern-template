import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <div className='container'>
        <div className='links'>
          <Link to='/posts'>
            <button id="homebutton">Acebook</button>
          </Link>
          <Link to="/post">
            <button id="Feed">View Feed</button>
          </Link>
          <Link to="/profile">
            <button id="profile-page">My Profile</button>
          </Link>
          <Link to="/login">
            <button id="logout">Logout</button>
          </Link>
          {/* <a href='/posts'>Acebook</a>
          <a href='/posts'>View Feed</a>
          <a href='/profile'>My Profile</a>
          <a href='/login'>Logout</a> */}
        </div>
      </div>
    </header>

  )
}

export default Navbar;