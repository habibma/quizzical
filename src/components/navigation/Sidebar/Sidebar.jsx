import { useEffect } from "react";
import SidebarItem from "./SidebarItem";
import Button from "../../ui/Button/Button";

import './Sidebar.css';

const Sidebar = ({
  collapsed,
  handleToggleSidebar,
  opened,
  handleCloseSidebar,
  items,
  title = 'Workspace',
  className = '',
}) => {
  useEffect(() => {
    if (!opened) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') handleCloseSidebar?.();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [opened, handleCloseSidebar]);

  const sections = items.reduce((groups, item) => {
    const section = item.section || 'Navigation';
    if (!groups[section]) groups[section] = [];
    groups[section].push(item);
    return groups;
  }, {});

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${opened ? 'opened' : ''} ${className}`.trim()} aria-label={title}>
      <header className="sidebar-header">
        <h2>{title}</h2>
      </header>
      <nav className="admin-nav" aria-label="Primary navigation">
        {Object.entries(sections).map(([section, sectionItems]) => (
          <section className="sidebar-section" key={section}>
            {!collapsed && <h3 className="sidebar-section-title">{section}</h3>}
            <ul className="sidebar-menu">
              {sectionItems.map((item) => (
                <SidebarItem
                  key={item.path}
                  icon={item.icon}
                  label={item.title}
                  to={item.path}
                  collapsed={collapsed}
                  onNavigate={handleCloseSidebar}
                />
              ))}
            </ul>
          </section>
        ))}
      </nav>
      <footer className="sidebar-footer">
        <Button
          className="toggle-sidebar-btn"
          text={collapsed ? '>' : '< Collapse'}
          onClick={handleToggleSidebar}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!collapsed}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        />
      </footer>
    </aside>
  );
}

export default Sidebar;
