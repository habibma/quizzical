import { Outlet } from "react-router-dom";

import './PublicLayout.css'

import Header from "../../components/layout/Header/Header";
import Footer from "../../components/layout/Footer/Footer";

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
