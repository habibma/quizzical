import { Outlet } from "react-router-dom";

import './AdminLayout.css'
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header";

const AdminLayout = ({ theme, toggleTheme, pageTitle }) => {
    return (
        <div className="admin-layout">
            <Header theme={theme} toggleTheme={toggleTheme} pageTitle={pageTitle} />
            <Sidebar />
            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout
