
import { useMemo, useState } from 'react'
import { useQuiz } from '../../../context/Admin/QuizContext.jsx'

import './Quizzes.css'

const StudentQuizzes = () => {
    const { quizzes } = useQuiz()
    const [searchTerm, setSearchTerm] = useState('')

    const availableQuizzes = useMemo(() => {
        const query = searchTerm.trim().toLowerCase()

        return quizzes.filter(quiz => {
            const status = quiz.access?.status ?? (quiz.isPublished ? 'published' : 'draft')
            const visibility = quiz.access?.visibility ?? 'class'
            const text = `${quiz.general?.title ?? ''} ${quiz.general?.description ?? ''}`.toLowerCase()

            return status === 'published' && visibility !== 'private' && (!query || text.includes(query))
        })
    }, [quizzes, searchTerm])

    return (
        <div className="student-quizzes">
            <header className="student-quizzes__header">
                <div>
                    <h1>Available Quizzes</h1>
                    <p>Choose a published quiz to begin.</p>
                </div>
                <label className="student-quizzes__search">
                    <span>Search quizzes</span>
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={event => setSearchTerm(event.target.value)}
                        placeholder="Search by title"
                    />
                </label>
            </header>

            {availableQuizzes.length === 0 ? (
                <div className="student-quizzes__empty">
                    <h2>No quizzes available</h2>
                    <p>Published quizzes will appear here when they are assigned to students.</p>
                </div>
            ) : (
                <div className="student-quizzes__grid">
                    {availableQuizzes.map(quiz => (
                        <article className="student-quiz-card" key={quiz.id}>
                            <div className="student-quiz-card__content">
                                <span className="student-quiz-card__visibility">
                                    {quiz.access?.visibility ?? 'Class'}
                                </span>
                                <h2>{quiz.general?.title || 'Untitled quiz'}</h2>
                                <p>{quiz.general?.description || 'No description provided.'}</p>
                                <div className="student-quiz-card__facts">
                                    <span>{quiz.content?.questionCount || 0} questions</span>
                                    <span>{quiz.rules?.timeLimit || 'No'} min limit</span>
                                    <span>{quiz.rules?.attempts || 'Unlimited'} attempts</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}

export default StudentQuizzes