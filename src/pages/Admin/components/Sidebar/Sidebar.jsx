import SidebarItem from "./SidebarItem";
import { sidebarItems } from "./sidebarItems";

import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>Admin Panel</h2>
      <nav className="admin-nav">
        <ul className="sidebar-menu">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.title}
              to={item.path}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
