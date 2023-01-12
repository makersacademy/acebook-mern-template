import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = ({ navigate }) => {
  
  const loggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  };

  return (
    <header>
      <div className="container">
          <Link to={loggedIn ? '/posts' : '/login'}>
            <h1>Acebook</h1>
         </Link>
        <nav>
          {loggedIn && (
            <div>
              <button onClick={handleLogout}>Log out</button>
            </div>
          )}
          {!loggedIn && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;