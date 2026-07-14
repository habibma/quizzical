import SidebarItem from "./SidebarItem";
import { sidebarItems } from "./sidebarItems";
import Button from "../../../../components/Button";

import './Sidebar.css';

const Sidebar = ( { collapsed, handleToggleSidebar, opened } ) => {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${opened ? 'opened' : ''}`}>
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
      </nav>
      <footer className="sidebar-footer">
        <Button className="toggle-sidebar-btn" text={collapsed ? '☰' : '☰ Collapse'} onClick={handleToggleSidebar} />
      </footer>
    </aside>
  );
}

export default Sidebar;
