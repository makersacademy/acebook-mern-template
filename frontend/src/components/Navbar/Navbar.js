import './Navbar.css';
import { Link } from 'react-router-dom';

const user_id = window.localStorage.getItem('user_id');

const nav = ({ navigate }) => {
  const logout = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user_id');
    navigate('/login');
  }
}


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
          <Link to={ `/users/${user_id}` }>
            <button id="profile-page">My Profile</button>
          </Link>
          <Link to="/login">
            <button className='logout' onClick={ nav }>Logout</button>
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