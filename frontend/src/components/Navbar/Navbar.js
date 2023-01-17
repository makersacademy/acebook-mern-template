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
          <Link className='homepage' to='/posts'>Acebook</Link>
          <Link className='homepage' to='/posts'>View Feed</Link>
          <Link className='profile_page' to={ `/profile/${user_id}` }>My Profile</Link>
          <button className='logout' onClick={ nav }>Logout</button>
        </div>
      </div>
    </header>

  )
}

export default Navbar;