// admin Header containd a burger menu for mobile veiw, title of the page, theme toggle and user avatar with dropdown menu for profile and logout
import React from "react";

import './Header.css';

import UserIcon from "../../../assets/icons/UserIcon";
import UserMenu from "./UserMenu";
import LightIcon from "../../../assets/icons/LightIcon";
import DarkIcon from "../../../assets/icons/DarkIcon";

const Header = ({ isSidebarOpen, toggleSidebar, pageTitle, opened, handleToggleSidebarOpen, theme, toggleTheme }) => {
    return (
        <header className="admin-header">
            <div className="header-left">
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
                <div className="page-title">
                    {pageTitle}
                </div>
                <UserMenu />
            </div>
        </header>
    );
};

export default Header;
