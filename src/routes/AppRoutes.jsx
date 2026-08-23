import { Routes, Route } from 'react-router-dom'
// public pages
import PublicLayout from '../layouts/PublicLayout/PublicLayout'
import Home from '../pages/Public/Home/Home'
import Quiz from '../pages/Public/Quiz/Quiz'
import Result from '../pages/Public/Result/Result'
import About from '../pages/Public/About/About'
// Platform Admin pages
import PlatformAdminLayout from '../layouts/PlatformAdminLayout/PlatformAdminLayout'
import Dashboard from '../pages/PlatformAdmin/Dashboard/Dashboard.jsx'
import Api from '../pages/PlatformAdmin/Api/Api'
import Themes from '../pages/PlatformAdmin/Themes/Themes.jsx'
import Categories from '../pages/PlatformAdmin/Categories/Categories.jsx'
import Questions from '../pages/PlatformAdmin/Questions/Questions'
import Settings from '../pages/PlatformAdmin/Settings/Settings.jsx'
import Statistics from '../pages/PlatformAdmin/Statistics/Statistics.jsx'
// School Admin pages
import PrincipalDashboard from '../pages/SchoolAdmin/Dashboard/Dashboard.jsx'
// teacher pages
import TeacherLayout from '../layouts/TeacherLayout/TeacherLayout'
import Repositories from '../pages/Teacher/Repositories/Repos'
import Quizzes from '../pages/Teacher/Quizzes/Quizzes.jsx'
import TeacherDashboard from '../pages/Teacher/Dashboard/Dashboard.jsx'
// student pages
import StudentDashboard from '../pages/Student/Dashboard/Dashboard.jsx'
// context providers
import { QuestionsProvider } from '../context/Admin/QuestionsContext.jsx'
import { QuizProvider } from '../context/Public/QuizContext.jsx'

function AppRoutes({ theme, toggleTheme }) {
    return (
        <Routes>
            <Route path="/" element={
                <QuizProvider>
                    <PublicLayout
                        theme={theme}
                        toggleTheme={toggleTheme}
                    />
                </QuizProvider>
            }>
                <Route index element={<Home />} />
                <Route path="quiz" element={<Quiz />} />
                <Route path="result" element={<Result />} />
                <Route path="about" element={<About />} />
            </Route>
            <Route path="/admin" element={<PlatformAdminLayout theme={theme} toggleTheme={toggleTheme} />} >
                <Route index element={<PrincipalDashboard />} />
                <Route path="questions" element={
                    <QuestionsProvider>
                        <Questions />
                    </QuestionsProvider>
                } />
                <Route path="categories" element={<Categories />} />
                <Route path="settings" element={<Settings />} />
                <Route path="themes" element={<Themes />} />
                <Route path="api" element={<Api />} />
                <Route path="statistics" element={<Statistics />} />
            </Route>
            <Route path="/principal" element={<PrincipalDashboard />} />
            <Route path="/teacher" element={<TeacherLayout theme={theme} toggleTheme={toggleTheme} />} >
                <Route index element={<Dashboard />} />
                <Route path="repositories" element={<Repositories />} />
                <Route path="quizzes" element={<Quizzes />} />
            </Route>
            <Route path="/student" element={<StudentDashboard />} />
        </Routes>
    )
}

export default AppRoutes