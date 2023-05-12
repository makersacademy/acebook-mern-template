    import React from 'react'
    // import { PrimaryNav, MenuLink, Menu, style} from ‘./NavbarElements’
    import './NavBar.css';

    const Navbar = () => {

      return (
          <>
            <nav className='nav-bar'>
              <div className='nav-item' ><a href='/login'>Login</a></div>
              <div className='nav-item'><a href='/signup'>Sign up</a></div>
            </nav>
          </>
      )
    }
    export default Navbar