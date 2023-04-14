import mainlogo from '../../main-logo-air.png';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { MemoryRouter } from 'react-router-dom';


const NavBar = ({ navigate }) => {

  return (
    <>
      <nav data-cy="nav" className='nav'>
        <div data-cy="logo-container" className="logo-container">
          <Link to="/"><img src={mainlogo}/></Link>
        </div>
        <div data-cy="menu-container" className="menu-container">
          <ul>
            <li><Link to="/posts">FEED</Link></li>
            <li><Link to="/login">LOGIN</Link></li>
            <li><Link to="/signup">SIGN UP</Link></li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;