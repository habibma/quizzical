import { Routes, Route } from 'react-router-dom'
// public pages
import PublicLayout from '../layouts/PublicLayout'
import Home from '../pages/Public/Home/Home'
import Quiz from '../pages/Public/Quiz/Quiz'
import Result from '../pages/Public/Result/Result'
import About from '../pages/Public/About/About'
// admin pages
import AdminLayout from '../pages/Admin/AdminLayout'
import Dashboard from '../pages/Admin/Dashboard/Dashboard.jsx'
import Questions from '../pages/Admin/Questions/Questions'
import Quizzes from '../pages/Admin/Quizzes/Quizzes.jsx'
import Categories from '../pages/Admin/Categories/Categories.jsx'
import Settings from '../pages/Admin/Settings/Settings.jsx'
import Statistics from '../pages/Admin/Statistics/Statistics.jsx'
import Themes from '../pages/Admin/Themes/Themes.jsx'
import Api from '../pages/Admin/Api/Api'
import Repositories from '../pages/Admin/Repositories/Repos'
// context providers
import { QuestionsProvider } from '../context/Admin/QuestionsContext.jsx'
import { QuizProvider } from '../context/Public/QuizContext.jsx'

function AppRoutes({ theme, toggleTheme }) {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <QuizProvider>
                        <PublicLayout
                            theme={theme}
                            toggleTheme={toggleTheme}
                        />
                    </QuizProvider>
                }
            >
                <Route index element={<Home />} />
                <Route path="quiz" element={<Quiz />} />
                <Route path="result" element={<Result />} />
                <Route path="about" element={<About />} />
            </Route>
            <Route path="/admin" element={<AdminLayout theme={theme} toggleTheme={toggleTheme} />} >
                <Route index element={<Dashboard />} />
                <Route path="questions" element={
                    <QuestionsProvider>
                        <Questions />
                    </QuestionsProvider>
                } />
                <Route path="quizzes" element={<Quizzes />} />
                <Route path="categories" element={<Categories />} />
                <Route path="settings" element={<Settings />} />
                <Route path="themes" element={<Themes />} />
                <Route path="api" element={<Api />} />
                <Route path="statistics" element={<Statistics />} />
                <Route path="repositories" element={<Repositories />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes