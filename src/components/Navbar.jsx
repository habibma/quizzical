import { Link } from "react-router-dom"

const NavItem = ({ to, text }) => {
  return (
    <Link to={to} className="nav-item">{text}</Link>
  )
}

const Navbar = () => {
  return (
    <nav className="navbar">
        <NavItem to="/" text="Home" />
        <span className="nav-separator">|</span>
        <NavItem to="/about" text="About" />
        <span className="nav-separator">|</span>
        <NavItem to="/admin" text="Admin" />
    </nav>
  )
}

export default Navbar