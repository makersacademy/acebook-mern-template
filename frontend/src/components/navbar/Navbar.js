const Navbar = ({navigate,userData}) => {
  const logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <ul>
        <button data-cy="homeButton" onClick={()=> navigate('/posts')}>Home</button>
        <p data-cy="user-first-name">{userData && userData.firstName}</p>
        <button data-cy="logoutButton" onClick={logout}>Log out</button>
        
      </ul>
    </nav>
    )
}

export default Navbar;