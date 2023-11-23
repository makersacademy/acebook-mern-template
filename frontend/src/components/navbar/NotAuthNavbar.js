import { Link, useMatch, useResolvedPath } from "react-router-dom"
import './Navbar.css'

const NotAuthNavbar = () => {
  return (
    <nav className="nav">
      <Link to="/login" className="site-title" >
      <span data-cy="useNavbarlogo"> Acebook </span>
      </Link>
      <ul>
        <CustomLink to="/signup">Register</CustomLink>
        <CustomLink to="/login">Sign In</CustomLink>
      </ul>
    </nav>
  )
}
const CustomLink = ({ to, children, ...props }) => {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

export default NotAuthNavbar;

