
const NavItem = ({ to, text }) => {
  return (
    <a href={to} className="nav-item">{text}</a>
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