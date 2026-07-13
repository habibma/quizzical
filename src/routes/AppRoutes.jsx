
function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/admin" element={<AdminLayout />} >
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