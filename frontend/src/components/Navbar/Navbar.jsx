const Navbar = ({ location }) => {
  // const isLoggedIn = window.localStorage.getItem("token");
  console.log("navbarcheck", location);

  const switchLocation = () => {
    if (location === "/signup") {
      return (
        <>
          <h1 data-cy="h1">Acebook</h1>
          <a href="/signup" data-cy="signup">
            Sign Up
          </a>
        </>
      );
    } else if (location === "/login") {
      return (
        <>
          <h1 data-cy="h1">Acebook</h1>
          <a href="/login" data-cy="login">
            Log In
          </a>
        </>
      );
    } else
      return (
        <>
          <h1 data-cy="h1">Acebook</h1>
          <a href="/login" data-cy="login">
            Log In
          </a>
          <a href="/signup" data-cy="signup">
            Sign Up
          </a>
        </>
      );
  };

  return <nav>{switchLocation()}</nav>;

  //    return  <nav>
  //         <h1 data-cy="h1">Acebook</h1>
  //          <a href="/login" data-cy="login">Log In</a>
  //     </nav>
};

export default Navbar;

// {(user!=null)?
//     (
//         <div id="navbar">
//         <div class="tracking-in-contract-bck">
//             Blogs4You
//         </div>
//         <div id="navLinks">
//             <Link to="/about">About</Link>
//             ||
//             <Link to="/">Logout</Link>
//         </div>
//     </div>
//     );
// :
