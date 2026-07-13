import { Outlet } from "react-router-dom";

import './PublicLayout.css'

import Header from "../components/Header";
import Footer from "../components/Footer";

const PublicLayout = ({ theme, toggleTheme }) => {
    return (
        <div className="public-layout">
            <Header theme={theme} toggleTheme={toggleTheme} />
            <main className="public-main">
                <Outlet context={{ theme, toggleTheme }} />
            </main>
            <Footer />
        </div>
    )
}

export default PublicLayout
