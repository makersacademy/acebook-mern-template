import React from 'react'
// import { PrimaryNav, MenuLink, Menu, style} from ‘./NavbarElements’
const Navbar = () => {

  return (
    <>
     <h2>Farcebook</h2>
    <nav>
   
   <ul>
    <li className='nav-item' ><a href='/login'>Login</a></li>
    <li className='nav-item'><a href='/signup'>Sign up</a></li>
    </ul>
    </nav>
    </>
  )
}
export default Navbar