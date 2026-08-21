import { Link } from "react-router-dom"

const NavItem = ({ to, text }) => {
  return (
    <Link to={to} className="nav-item">{text}</Link>
  )
}

const Navbar = ({items}) => {
  return (
    <nav className="navbar">
      {items.map((item, index) => (
        <NavItem key={index} to={item.path} text={item.title} />
      ))}
    </nav>
  )
}

export default Navbar