import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/ACEBOOK.png";
import { useEffect } from "react";
import styles from "./Navbar.css";

const Navbar = ({ location }) => {
  const isLoggedIn = window.localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (location === "/" && isLoggedIn) {
      navigate("/posts");
    }
  }, []);

  const IsLoggedOut = () => {
    setTimeout(() => {
      window.localStorage.removeItem("token");
    }, 10000);
    if (isLoggedIn) {
      window.localStorage.removeItem("token");
    }
    navigate("/");
  };

  const Signup = () => {
    if (location === "/login" && !isLoggedIn) {
      return (
        <Link to="/signup" data-cy="signup">
          Sign Up
        </Link>
      );
    }
  };

  const Login = () => {
    if (location === "/signup" || (location === "/" && !isLoggedIn)) {
      return (
        <Link to="/login" data-cy="login">
          Log In
        </Link>
      );
    }
  };

  const FeedNav = () => {
    if (isLoggedIn && location === "/posts") {
      return (
        <>
          <Link to="/connect" data-cy="connect">
            Connect
          </Link>
          <Link to="/profile" data-cy="profile">
            Profile
          </Link>
          <Link to="/" data-cy="logout" onClick={IsLoggedOut}>
            Sign Out
          </Link>
        </>
      );
    }
  };

  const FriendNav = () => {
    if (isLoggedIn && location === "/connect") {
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
    }
  };

  const MainNav = () => {
    if (
      isLoggedIn &&
      (location === "/profile" ||
        location === "/friend-list" ||
        location === "/friend" ||
        location === "/posts/new")
    )
      return (
        <>
          <Link to="/connect" data-cy="connect">
            Connect
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
    <header className="navbar">
      <div className="navbar-container" data-cy="nav-container">
        <Link to={isLoggedIn ? "/posts" : "/"}>
          <img data-cy="logo" src={logo} />
        </Link>
        <nav className="navbar-links" data-cy="nav">
          {Signup()}
          {Login()}
          {FeedNav()}
          {FriendNav()}
          {MainNav()}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
