import mainlogo from '../../main-logo-air.png';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { MemoryRouter } from 'react-router-dom';


const NavBar = ({ navigate }) => {

  return (
    <nav data-cy="nav" className='nav'>
      <div data-cy="logo-container" className="logo-container">
        <img src={mainlogo}/>
      </div>
      <div data-cy="menu-container" className="menu-container">
      <ul>
        <li>
          <Link to="/login">Log out</Link> 
        </li>
        <li>
          <Link to="/posts">Feed</Link> 
        </li>
        <li>
          <Link to="/signup">Sign up</Link> 
        </li>
        <li>
          <Link to="/createpost">Create a post</Link> 
        </li>
      </ul>
      </div>
    </nav>
  );
};

export default NavBar;