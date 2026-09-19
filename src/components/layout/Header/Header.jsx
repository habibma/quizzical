import Navbar from "../../navigation/Navbar/Navbar";
import Button from "../../ui/Button/Button";

import "./Header.css"

import { navItems } from "./navItems";
import Logo from "../../../components/ui/Logo/Logo";


const ThemeToggleButton = ({ theme, toggleTheme }) => {
  return (
    <Button className='theme-btn' size='sm' onClick={toggleTheme} text={theme === "light" ? "Dark Mode" : "Light Mode"} />
  )
}

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className='header'>
      <Logo />
      <Navbar items={navItems} />
      <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
    </header>
  )
}

export default Header