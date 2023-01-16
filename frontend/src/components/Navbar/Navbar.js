import './Navbar.css';


const Navbar = () => {
  return (
    <header>
      <div className='container'>
        <div className='links'>
          <a href='/posts'>Acebook</a>
          <a href='/posts'>View Feed</a>
          <a href='/profile'>My Profile</a>
          <a href='/login'>Logout</a>
        </div>
      </div>
    </header>

  )
}

export default Navbar;