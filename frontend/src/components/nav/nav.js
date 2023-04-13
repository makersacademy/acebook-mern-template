const Navbar = () => {
  return (
  <nav className="nav">
    <a href="/" className="ace-book">Acebook</a>
    <ul >
      <li >
        <a href='/signup'>Sign Up</a>  
      </li>    
      <li>
        <a href='/login'>Login</a>  
      </li>        
    </ul>

  </nav>
  )
}

export default Navbar;