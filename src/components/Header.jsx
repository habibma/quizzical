import Navbar from "./Navbar"
import Button from "./Button"

import "./Header.css"

const Header = ({ theme, setTheme }) => {
  return (
    <header className='header'>
        <section className="navbar-container">
            <Navbar />
        </section>
        <section className='theme-btn-container'>
          <h1>Quizzical</h1>
          <Button className='theme-btn' onClick={() => setTheme(theme === "light" ? "dark" : "light")} text={theme === "light" ? "Dark Mode" : "Light Mode"} />
        </section>
      </header>
  )
}

export default Header