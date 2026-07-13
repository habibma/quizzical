import { NavLink } from "react-router-dom";

const SidebarItem = ({ icon: IconComponent, label, to, collapsed }) => {

    return (
        <li className="sidebar-menu-item">
            <NavLink to={to} className="sidebar-link">
                <IconComponent className="sidebar-icon" aria-hidden="true" />
                { !collapsed && <span>{label}</span> }
            </NavLink>
        </li>
    );
};

export default SidebarItem;