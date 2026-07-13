import SidebarItem from "./SidebarItem";
import { sidebarItems } from "./sidebarItems";

import './Sidebar.css';

const Sidebar = ( { collapsed, handleToggleSidebar } ) => {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <h2>Admin Panel</h2>
      <nav className="admin-nav">
        <ul className="sidebar-menu">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.title}
              to={item.path}
              collapsed={collapsed}
            />
          ))}
        </ul>
        <button className="toggle-button" onClick={handleToggleSidebar}>
          {collapsed ? 'Expand' : 'Collapse'}
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
