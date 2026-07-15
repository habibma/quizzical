// admin Header containd a burger menu for mobile veiw, title of the page, theme toggle and user avatar with dropdown menu for profile and logout
import React from "react";

import './Header.css';

import UserIcon from "../../../assets/icons/UserIcon";
import UserMenu from "./UserMenu";

const Header = ({ isSidebarOpen, toggleSidebar, pageTitle, opened, handleToggleSidebarOpen }) => {
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
                <UserMenu />
            </div>
        </header>
    );
};

export default Header;
