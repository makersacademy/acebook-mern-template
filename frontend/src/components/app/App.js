import React from 'react';
import { useLocation, Routes, Route, Link } from 'react-router-dom';
import LogoSearch from './LogoSearch';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../user/SignUpForm';
import SinglePost from '../singlePost/SinglePost';
import Feed from '../feed/Feed';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <LogoSearch />
      <ul className="nav-links">
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/login">Home</Link>
        </li>
        <li>
          <Link to="/help">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  const location = useLocation();

  return (
    <div className="app-wrapper">
      <div className="left-side">
        {/* Place the post element component here */}
      </div>
      <div className="middle-side">
        {location.pathname !== '/login' && <Navbar />}
        <Routes>
          <Route path="/posts/:id" element={<SinglePost navigate={() => {}} />} />
          <Route path="/" element={<Feed navigate={() => {}} />} />
          <Route path="/posts" element={<Feed navigate={() => {}} />} />
          <Route path="/login" element={<LoginForm navigate={() => {}} />} />
          <Route path="/signup" element={<SignUpForm navigate={() => {}} />} />
        </Routes>
      </div>
      <div className="right-side">
        {/* Place the search element component here */}
      </div>
    </div>
  );
};

export default App;
