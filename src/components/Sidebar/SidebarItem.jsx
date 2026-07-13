import { NavLink } from "react-router-dom";

const SidebarItem = ({ icon: IconComponent, label, to }) => {

    return (
        <li className="sidebar-menu-item">
            <NavLink to={to} className="sidebar-link">
                <IconComponent className="sidebar-icon" aria-hidden="true" />
                <span>{label}</span>
            </NavLink>
        </li>
    );
};

export default SidebarItem;