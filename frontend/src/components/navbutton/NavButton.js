import { Link, NavLink } from "react-router-dom"
import "./navbutton.css"

function NavButton(props) {
  const to = props.to;
  const value = props.value;

  return (
    <NavLink to={to} className="navbutton">{value}</NavLink>
  )
}

export default NavButton;