import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ navigate }) => {
  const loggedIn = window.localStorage.getItem("user_id");

  const handleLogout = () => {
    setTimeout(() => {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user_id");
    }, 100);
    if (loggedIn) {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user_id");
    }
    navigate("/login");
  };

  return (
    <header>
      <div className="container">
        <Link to={loggedIn ? "/posts" : "/login"}>
          <h1 data-cy="h1">Acebook</h1>
        </Link>
        <nav data-cy="nav">
          {loggedIn && (
            <div>
              <Link to={`/users/${loggedIn}`}>Profile</Link>
              <Link to={`/friends/${loggedIn}`}>Friends</Link>
              <Link to="/login" data-cy="logout" onClick={handleLogout}>Log out</Link>
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
