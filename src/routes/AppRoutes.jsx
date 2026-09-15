import { Navigate, Routes, Route } from 'react-router-dom'
// public pages
import PublicLayout from '../layouts/PublicLayout/PublicLayout'
import HomePage from '../pages/HomePage/HomePage'
import Quiz from '../pages/Public/Quiz/Quiz'
import Result from '../pages/Public/Result/Result'
import About from '../pages/Public/About/About'
import CustomQuiz from '../pages/Public/CustomQuiz/CustomQuiz'
// Platform Admin pages
import PlatformAdminLayout from '../layouts/PlatformAdminLayout/PlatformAdminLayout'
import PlatformAdminDashboard from '../pages/PlatformAdmin/Dashboard/Dashboard.jsx'
import Api from '../pages/PlatformAdmin/Api/Api'
import Themes from '../pages/PlatformAdmin/Themes/Themes.jsx'
import Categories from '../pages/PlatformAdmin/Categories/Categories.jsx'
import Questions from '../pages/PlatformAdmin/QuestionSources/QuestionSources'
import Settings from '../pages/PlatformAdmin/Settings/Settings.jsx'
import Statistics from '../pages/PlatformAdmin/Statistics/Statistics.jsx'
import Rewards from '../pages/PlatformAdmin/Rewards/Rewards.jsx'
// School Admin pages
import SchoolAdminLayout from '../layouts/SchoolAdminLayout/SchoolAdminLayout'
import PrincipalDashboard from '../pages/SchoolAdmin/Dashboard/Dashboard.jsx'
import SchoolStudents from '../pages/SchoolAdmin/Students/Students.jsx'
import SchoolTeachers from '../pages/SchoolAdmin/Teachers/Teachers.jsx'
import SchoolClasses from '../pages/SchoolAdmin/Classes/Classes.jsx'
import SchoolCourses from '../pages/SchoolAdmin/Courses/Courses.jsx'
import SchoolReports from '../pages/SchoolAdmin/Reports/Reports.jsx'
import SchoolParents from '../pages/SchoolAdmin/Parents/Parents.jsx'
import SchoolSettings from '../pages/SchoolAdmin/Settings/Settings.jsx'
import StudentProfile from '../pages/SchoolAdmin/Students/StudentProfile.jsx'
import TeacherProfile from '../pages/SchoolAdmin/Teachers/TeacherProfile.jsx'
// teacher pages
import TeacherLayout from '../layouts/TeacherLayout/TeacherLayout'
import TeacherDashboard from '../pages/Teacher/Dashboard/Dashboard.jsx'
import Repositories from '../pages/Teacher/Repositories/Repos'
import Quizzes from '../pages/Teacher/Quizzes/Quizzes.jsx'
import QuestionBank from '../pages/Teacher/Questions/QuestionBank.jsx'
import MyQuestions from '../pages/Teacher/Questions/MyQuestions.jsx'
// student pages
import StudentLayout from '../layouts/StudentLayout/StudentLayout'
import StudentDashboard from '../pages/Student/Dashboard/Dashboard.jsx'
import StudentQuizzes from '../pages/Student/Quizzes/Quizzes.jsx'
import StudentInsights from '../pages/Student/Insights/Insights.jsx'
import StudentLeaderboard from '../pages/Student/Leaderboard/Leaderboard.jsx'
// context providers
import { QuestionsProvider } from '../context/Admin/QuestionsContext.jsx'
import { QuizProvider as AdminQuizProvider } from '../context/Admin/QuizContext.jsx'
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
                <Route index element={<PlatformAdminDashboard />} />
                <Route path="question-sources" element={
                    <QuestionsProvider>
                        <Questions mode="sources" />
                    </QuestionsProvider>
                } />
                <Route path="questions" element={<Navigate to="/admin/question-sources" replace />} />
                <Route path="categories" element={<Categories />} />
                <Route path="rewards" element={<Rewards />} />
                <Route path="settings" element={<Settings />} />
                <Route path="themes" element={<Themes />} />
                <Route path="api" element={<Api />} />
                <Route path="statistics" element={<Statistics />} />
            </Route>
            <Route path="/principal" element={<SchoolAdminLayout theme={theme} toggleTheme={toggleTheme} />} >
                <Route index element={<PrincipalDashboard />} />
                <Route path="students" element={<SchoolStudents />} />
                <Route path="students/:studentId" element={<StudentProfile />} />
                <Route path="teachers" element={<SchoolTeachers />} />
                <Route path="teachers/:teacherId" element={<TeacherProfile />} />
                <Route path="classes" element={<SchoolClasses />} />
                <Route path="courses" element={<SchoolCourses />} />
                <Route path="reports" element={<SchoolReports />} />
                <Route path="parents" element={<SchoolParents />} />
                <Route path="settings" element={<SchoolSettings />} />
            </Route>
            <Route path="/teacher" element={<TeacherLayout theme={theme} toggleTheme={toggleTheme} />} >
                <Route index element={<TeacherDashboard />} />
                <Route path="repositories" element={<Repositories />} />
                <Route path="question-bank" element={
                    <QuestionsProvider>
                        <QuestionBank />
                    </QuestionsProvider>
                } />
                <Route path="my-questions" element={
                    <QuestionsProvider>
                        <MyQuestions />
                    </QuestionsProvider>
                } />
                <Route path="quizzes" element={
                    <AdminQuizProvider>
                        <QuestionsProvider>
                            <Quizzes />
                        </QuestionsProvider>
                    </AdminQuizProvider>
                } />
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