import UserMenu from "./UserMenu";
import LightIcon from "../../assets/icons/LightIcon";
import DarkIcon from "../../assets/icons/DarkIcon";

import './Header.css';

const Header = ({ pageTitle = "Dashboard", handleToggleSidebarOpen, theme, toggleTheme }) => {
    return (
        <header className="admin-topbar">
            <div className="header-left">
                <button
                    className="icon-button burger-menu"
                    type="button"
                    aria-label="Open navigation menu"
                    title="Open navigation menu"
                    onClick={handleToggleSidebarOpen}
                >
                    <div className="burger-bar-container">
                        <span className="burger-bar"></span>
                        <span className="burger-bar"></span>
                        <span className="burger-bar"></span>
                    </div>
                </button>
                <h2 className="page-title">{pageTitle}</h2>
            </div>
            <div className="header-right">
                <button
                    className="icon-button theme-toggle"
                    type="button"
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                    onClick={toggleTheme}
                >
                    {theme === 'light' ? <LightIcon /> : <DarkIcon />}
                </button>
                <div className="view-site">
                    <a href="/" target="_blank" rel="noopener noreferrer">
                        View Site
                    </a>
                </div>
                <UserMenu />
            </div>
        </header>
    );
};

export default Header;
