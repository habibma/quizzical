import { Routes, Route } from 'react-router-dom'
// pages
import PublicLayout from '../layouts/PublicLayout'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
// admin pages
import AdminLayout from '../pages/Admin/AdminLayout'
import Dashboard from '../pages/Admin/Dashboard'
import Questions from '../pages/Admin/Questions'
import Quizzes from '../pages/Admin/Quizzes'
import Categories from '../pages/Admin/Categories'
import Settings from '../pages/Admin/Settings'
import Statistics from '../pages/Admin/Statistics'
import Themes from '../pages/Admin/Themes'
import Api from '../pages/Admin/Api'

function AppRoutes({ theme, toggleTheme, questions, questionPage, startPage, subjects, category, loading, startQuiz, handleSelect, checkAnswer, handleCtegoryChange }) {
    return (
        <Routes>
            <Route path="/" element={<PublicLayout theme={theme} toggleTheme={toggleTheme} />} >
                <Route index element={<Home questions={questions} questionPage={questionPage} startPage={startPage} />} />
                <Route path="about" element={<About />} />
            </Route>
            <Route path="/admin" element={<AdminLayout theme={theme} toggleTheme={toggleTheme} />} >
                <Route index element={<Dashboard />} />
                <Route path="questions" element={<Questions />} />
                <Route path="quizzes" element={<Quizzes />} />
                <Route path="categories" element={<Categories />} />
                <Route path="settings" element={<Settings />} />
                <Route path="themes" element={<Themes />} />
                <Route path="api" element={<Api />} />
                <Route path="statistics" element={<Statistics />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes