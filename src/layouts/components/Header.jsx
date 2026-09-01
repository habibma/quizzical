import Logo from "../../components/ui/Logo/Logo";

import UserIcon from "../../assets/icons/UserIcon";
import UserMenu from "./UserMenu";
import LightIcon from "../../assets/icons/LightIcon";
import DarkIcon from "../../assets/icons/DarkIcon";

import './Header.css';

const Header = ({ isSidebarOpen, toggleSidebar, pageTitle, opened, handleToggleSidebarOpen, theme, toggleTheme }) => {
    return (
        <header className="admin-header">
            <div className="header-left">
                <Logo />
                <h2 className="page-title">{pageTitle}</h2>
                <div className="burger-menu" onClick={handleToggleSidebarOpen}>
                    <span className="burger-bar"></span>
                    <span className="burger-bar"></span>
                    <span className="burger-bar"></span>
                </div>
            </div>
            <div className="header-right">
                <div className="theme-toggle" onClick={toggleTheme}>
                    {theme === 'light' ? <LightIcon /> : <DarkIcon />}
                </div>
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
