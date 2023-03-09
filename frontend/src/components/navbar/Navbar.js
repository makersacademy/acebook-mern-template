const Navbar = ({navigate}) => {
  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <ul>
        <button data-cy="homeButton" onClick={()=> navigate('/posts')}>Home</button>
        <button data-cy="logoutButton" onClick={logout}>Log out</button>
        
      </ul>
    </nav>
    )
}

export default Navbar;