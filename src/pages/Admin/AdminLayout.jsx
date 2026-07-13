import { Outlet, NavLink } from "react-router-dom";

import './AdminLayout.css'

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <h2>Admin Panel</h2>
                <nav className="admin-nav">
                    <NavLink to="/admin" className="admin-nav-link">Dashboard</NavLink>
                    <h3>Content</h3>
                    <NavLink to="/admin/questions" className="admin-nav-link">Questions</NavLink>
                    <NavLink to="/admin/quizzes" className="admin-nav-link">Quizzes</NavLink>
                    <NavLink to="/admin/categories" className="admin-nav-link">Categories</NavLink>
                    <h3>Configuration</h3>
                    <NavLink to="/admin/settings" className="admin-nav-link">Settings</NavLink>
                    {/* <NavLink to ="/admin/api" className="admin-nav-link">API</NavLink>
                    <NavLink to="/admin/themes" className="admin-nav-link"><Themes></Themes></NavLink> */}
                    <NavLink to="/admin/statistics" className="admin-nav-link">Statistics</NavLink>
                </nav>
            </aside>
            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout
