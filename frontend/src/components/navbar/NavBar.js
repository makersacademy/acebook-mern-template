    import React, { useEffect, useState } from 'react';
    // import { PrimaryNav, MenuLink, Menu, style} from ‘./NavbarElements’
    import './NavBar.css';
    import Feed from '../feed/Feed';
    import LogInForm from '../auth/LoginForm';
    import SignUpForm from '../user/SignUpForm'

    const Navbar = ({ navigate }) => {
      
      const [token, setToken] = useState(window.localStorage.getItem("token"));
      const [username, setUsername] = useState('');
      
      useEffect(() => {
        if(token !== window.localStorage.getItem("token")) {
          setToken(window.localStorage.getItem("token"))
        }
        setUsername(window.localStorage.getItem("username"))
      }, [window.localStorage.getItem("token")])

      const logout = () => {
        window.localStorage.removeItem("token")
        // navigate('/login')
      }

      if(token) {
        return (
          <>
           <nav className='nav-bar'>
           <h2>Farcebook</h2>
             <div className="username-format">{username}</div>
             <div className='nav-item' onClick={logout}><a href='/login'>Logout</a></div>
           </nav>
          </>
        )
      } else {
        return (
          <>
          <h2>Farcebook</h2>
           <nav className='nav-bar'>
             <div className='nav-item' ><a href='/login'>Login</a></div>
             <div className='nav-item'><a href='/signup'>Sign up</a></div>
           </nav>
          </>
        )
      }
    }
    export default Navbar


  