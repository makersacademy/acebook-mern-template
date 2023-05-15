    import React, { useEffect, useState } from 'react';
    // import { PrimaryNav, MenuLink, Menu, style} from ‘./NavbarElements’
    import './NavBar.css';
    import Feed from '../feed/Feed';
    import LogInForm from '../auth/LoginForm';

    const Navbar = ({ navigate }) => {

      const [token, setToken] = useState(window.localStorage.getItem("token"));

      useEffect(() => {
        if(token !== window.localStorage.getItem("token")) {
          setToken(window.localStorage.getItem("token"))
        }
      }, [window.localStorage.getItem("token")])

      const logout = () => {
        window.localStorage.removeItem("token")
        // navigate('/login')
      }

    
      if(token) {
        return (
          <>
           <h2>Farcebook</h2>
           <nav className='nav-bar'>
             <div className='nav-item' onClick={logout}><a href='/logout'>Logout</a></div>
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

      
      // return (
      //     <>
      //      <h2>Farcebook</h2>
      //       <nav className='nav-bar'>
      //         <div className='nav-item' ><a href='/login'>Login</a></div>
      //         <div className='nav-item'><a href='/signup'>Sign up</a></div>
      //         <div className='nav-item'><a href='/logout'>Logout</a></div>
      //       </nav>
      //     </>
      // )
    }
    export default Navbar


  