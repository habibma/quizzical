import { Routes, Route } from 'react-router-dom'
// public pages
import PublicLayout from '../layouts/PublicLayout/PublicLayout'
import HomePage from '../pages/HomePage/HomePage'
import Quiz from '../pages/Public/Quiz/Quiz'
import Result from '../pages/Public/Result/Result'
import About from '../pages/Public/About/About'
import CustomQuiz from '../pages/Public/CustomQuiz/CustomQuiz'
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
import SchoolAdminLayout from '../layouts/SchoolAdminLayout/SchoolAdminLayout'
import PrincipalDashboard from '../pages/SchoolAdmin/Dashboard/Dashboard.jsx'
import SchoolStudents from '../pages/SchoolAdmin/Students/Students.jsx'
import SchoolTeachers from '../pages/SchoolAdmin/Teachers/Teachers.jsx'
// teacher pages
import TeacherLayout from '../layouts/TeacherLayout/TeacherLayout'
import Repositories from '../pages/Teacher/Repositories/Repos'
import Quizzes from '../pages/Teacher/Quizzes/Quizzes.jsx'
import TeacherDashboard from '../pages/Teacher/Dashboard/Dashboard.jsx'
// student pages
import StudentLayout from '../layouts/StudentLayout/StudentLayout'
import StudentDashboard from '../pages/Student/Dashboard/Dashboard.jsx'
import StudentQuizzes from '../pages/Student/Quizzes/Quizzes.jsx'
import StudentInsights from '../pages/Student/Insights/Insights.jsx'
import StudentLeaderboard from '../pages/Student/Leaderboard/Leaderboard.jsx'
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
                <Route index element={<HomePage />} />
                <Route path="quiz" element={<Quiz />} />
                <Route path="result" element={<Result />} />
                <Route path="about" element={<About />} />
                <Route path="custom-quiz" element={<CustomQuiz />} />
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
            <Route path="/principal" element={<SchoolAdminLayout theme={theme} toggleTheme={toggleTheme} />} >
                <Route index element={<PrincipalDashboard />} />
                <Route path="students" element={<SchoolStudents />} />
                <Route path="teachers" element={<SchoolTeachers />} />
            </Route>
            <Route path="/teacher" element={<TeacherLayout theme={theme} toggleTheme={toggleTheme} />} >
                <Route index element={<Dashboard />} />
                <Route path="repositories" element={<Repositories />} />
                <Route path="quizzes" element={<Quizzes />} />
            </Route>
            <Route path="/student" element={<StudentLayout theme={theme} toggleTheme={toggleTheme} />} >
                <Route index element={<StudentDashboard />} />
                <Route path="quizzes" element={<StudentQuizzes />} />
                <Route path="insights" element={<StudentInsights />} />
                <Route path="leaderboard" element={<StudentLeaderboard />} />
            </Route>
            <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
    )
}

export default AppRoutes