import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/ACEBOOK.png";

// frontend/public/ACEBOOK.png

const Navbar = ({ location }) => {
  const isLoggedIn = window.localStorage.getItem("token");
  const navigate = useNavigate();

  const IsLoggedOut = () => {
    setTimeout(() => {
      window.localStorage.removeItem("token");
    }, 10000);
    if (isLoggedIn) {
      window.localStorage.removeItem("token");
    }
    navigate("/login");
  };

  const signup = () => {
    if (location === "/login") {
      return (
        <Link to="/signup" data-cy="signup">
          Sign Up
        </Link>
      );
    }
  };

  const login = () => {
    if (location === "/signup" || location === "/") {
      return (
        <Link to="/login" data-cy="login">
          Log In
        </Link>
      );
    }
  };

  const feedNav = () => {
    return (
      <>
        <Link to="/search-friend" data-cy="search-friend">
          Search Friend
        </Link>
        <Link to="/profile" data-cy="profile">
          Profile
        </Link>
        <Link to="/" data-cy="logout" onClick={IsLoggedOut}>
          Sign Out
        </Link>
      </>
    );
  };

  const searchFriendNav = () => {
      return (
        <>
          <Link to="/posts" data-cy="feed">
          Feed
        </Link>
         <Link to="/profile" data-cy="profile">
          Profile
        </Link>
        <Link to="/" data-cy="logout" onClick={IsLoggedOut}>
          Sign Out
        </Link>    
        </>
      );
  };

  const mainNav = () => {
      return (
        <>
        <Link to="/search-friend" data-cy="search-friend">
          Search Friend
        </Link>
        <Link to="/posts" data-cy="feed">
          Feed
        </Link>
        <Link to="/profile" data-cy="profile">
          Profile
        </Link>
        <Link to="/" data-cy="logout" onClick={IsLoggedOut}>
          Sign Out
        </Link>
      </>
      );
  };

  return (
    <header>
      {isLoggedIn && location === "/posts" &&(
            <div className="container">
              <Link to="/posts">
                <img data-cy="logo" src={logo} />
              </Link>
              {feedNav()}
            </div>
          )}
         {isLoggedIn && location === "/search-friend" &&(
            <div className="container">
              <Link to="/posts">
                <img data-cy="logo" src={logo} />
              </Link>
              {searchFriendNav()}
            </div>
          )}
           {isLoggedIn && (location === "/profile" || location === "/friend-list" || location === "/friend" ) &&(
            <div className="container">
              <Link to="/posts">
                <img data-cy="logo" src={logo} />
              </Link>
              {mainNav()}
            </div>
          )}
      {!isLoggedIn && (
        <div>
          <h1 data-cy="logo">Acebook</h1>
          {signup()}
          {login()}
        </div>
      )}
    </header>
  );
};
export default Navbar;
