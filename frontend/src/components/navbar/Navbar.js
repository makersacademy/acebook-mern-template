const Navbar = ({navigate,userData,storeUserData}) => {
  const logout = () => {
    window.localStorage.removeItem("token");
    storeUserData(null);
    navigate("/login");
  };

  return (
    <nav className="bg-red-500 flex justify-between ">
        <div className="p-3 text-lg cursor-pointer" data-cy="homeButton" onClick={()=> navigate('/posts')}>Home</div>
        <div className="p-3 text-lg" data-cy="user-first-name">{userData && userData.firstName}</div>
        <div className="p-3 text-lg cursor-pointer border rounded-t bg-yellow-300 hover:bg-yellow-600" data-cy="logoutButton" onClick={logout}>Log out</div>
    </nav>
    )
}

export default Navbar;