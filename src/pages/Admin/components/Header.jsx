// admin Header containd a burger menu for mobile veiw, title of the page, theme toggle and user avatar with dropdown menu for profile and logout
import React from "react";

import './Header.css';

import UserIcon from "../../../assets/icons/UserIcon";

const Header = ({ isSidebarOpen, toggleSidebar, pageTitle, opened, handleToggleSidebarOpen }) => {
    return (
        <header className="admin-header">
            <div className="header-left">
                <button className="burger-menu" onClick={handleToggleSidebarOpen}>
                    <span className="burger-bar"></span>
                    <span className="burger-bar"></span>
                    <span className="burger-bar"></span>
                </button>
            </div>
            <div className="header-right">
                <div className="user-avatar">
                    <UserIcon />
                </div>
                <div className="user-dropdown">
                </div>
            </div>
        </header>
    );
};

export default Header;
