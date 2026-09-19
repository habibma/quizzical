import { useState } from 'react'
import UserIcon from "../../assets/icons/UserIcon";
import Button from "../../components/ui/Button/Button";

import './UserMenu.css'

const UserMenu = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="user-menu">
            <Button
                className="user-avatar"
                type="button"
                aria-label="Open user menu"
                title="Open user menu"
                onClick={toggleMenu}
            >
                <UserIcon />
            </Button>
            {isOpen && (
                <div className="user-menu-content">
                    <ul className="user-menu-list">
                        <li className='user-menu-item'><a>Profile</a></li>
                        <li className='user-menu-item'><a href="/">Logout</a></li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default UserMenu