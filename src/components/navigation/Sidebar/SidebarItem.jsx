import { NavLink } from "react-router-dom";

const SidebarItem = ({ icon: IconComponent, label, to, collapsed, onNavigate }) => {

    return (
        <li className="sidebar-menu-item">
            <NavLink
                to={to}
                className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
                aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
                title={collapsed ? label : undefined}
                onClick={onNavigate}
            >
                <IconComponent className="sidebar-icon" aria-hidden="true" />
                { !collapsed && <span>{label}</span> }
            </NavLink>
        </li>
    );
};

export default SidebarItem;