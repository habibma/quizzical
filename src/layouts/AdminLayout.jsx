import { Outlet } from "react-router-dom";

import './AdminLayout.css'
import Sidebar from "../../components/Sidebar/Sidebar";

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <Sidebar />
            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout
