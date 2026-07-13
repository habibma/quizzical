import { NavLink } from "react-router-dom";

const SidebarItem = ({ icon, label, to }) => {
  return (
    <li className="sidebar-menu-item">
      <NavLink to={to} className="sidebar-link">
        <i className={icon}></i>
        <span>{label}</span>
      </NavLink>
    </li>
  );
};

export default SidebarItem;