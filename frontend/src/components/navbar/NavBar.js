import mainlogo from './main-logo-air.png';
import { Link } from 'react-router-dom';


const NavBar = ({ navigate }) => {

  return (
    <nav data-cy="nav" className='nav'>
      <div data-cy="logo-container" className="logo-container">
        <img src={mainlogo}/>
      </div>
      <div data-cy="menu-container" className="menu-container">
        <li>
          <Link to="/">Log out</Link> 
        </li>
      </div>
    </nav>
  );
};

export default NavBar;