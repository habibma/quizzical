import Navbar from "../../../../components/ui/Navbar";
import Button from "../../../../components/ui/Button";

import "./Header.css"

import { navItems } from "./navItems";

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className='header'>
        <section className="navbar-container">
            <Navbar items={navItems} />
        </section>
        <section className='theme-btn-container'>
          <h1>Quizzical</h1>
          <Button className='theme-btn' onClick={toggleTheme} text={theme === "light" ? "Dark Mode" : "Light Mode"} />
        </section>
      </header>
  )
}

export default Header