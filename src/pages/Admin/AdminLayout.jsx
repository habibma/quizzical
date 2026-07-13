import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import './AdminLayout.css'
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header";

const AdminLayout = ({ theme, toggleTheme, pageTitle }) => {

    const [collapsed, setCollapsed] = useState(false);

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    }
    return (
        <div className="admin-layout">
            <Header theme={theme} toggleTheme={toggleTheme} pageTitle={pageTitle} />
            <Sidebar collapsed={collapsed} handleToggleSidebar={handleToggleSidebar} />
            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout
