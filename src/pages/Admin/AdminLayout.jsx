import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import './AdminLayout.css'
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header";

const AdminLayout = ({ theme, toggleTheme }) => {

    const [collapsed, setCollapsed] = useState(false);
    const [opened, setOpened] = useState(false);

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    }

    const handleToggleSidebarOpen = () => {
        setOpened(!opened);
    }

    useEffect(() => {
        document.body.style.overflow = opened ? 'hidden' : 'auto';

        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [opened]);

    return (
        <div className="admin-layout">
            <Sidebar className="admin-sidebar" collapsed={collapsed} handleToggleSidebar={handleToggleSidebar} opened={opened} />
            {opened && <div className="overlay" onClick={() => setOpened(false)}></div>}
            <Header className="admin-header" opened={opened} handleToggleSidebarOpen={handleToggleSidebarOpen} theme={theme} toggleTheme={toggleTheme} />
            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout
