import { useState, useEffect, createContext, useContext } from 'react'
import { getQuestions } from '../../services/triviaService'
import { useApi } from '../Admin/ApiContext'

const QuizContext = createContext()

export const QuizProvider = ({ children }) => {
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [score, setScore] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isQuizFinished, setIsQuizFinished] = useState(false)

    const { getDefaultApi } = useApi();

    const fetchQuestions = async ({ amount, category, difficulty, type }) => {
        setLoading(true)
        setError(null)

        const api = getDefaultApi();
        if (!api) {
            setError("No default API is set. Please set a default API in the Admin panel.");
            setLoading(false);
            return;
        }
        try {
            const fetchedQuestions = await getQuestions(api, { amount, category, difficulty, type })
            setQuestions(fetchedQuestions)
            setAnswers([])
            setScore(0)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    };

    const selectAnswer = (questionId, answer) => {
        setAnswers(prevAnswers => {
            const existingAnswerIndex = prevAnswers.findIndex(a => a.questionId === questionId)
            if (existingAnswerIndex !== -1) {
                const updatedAnswers = [...prevAnswers]
                updatedAnswers[existingAnswerIndex] = { questionId, answer }
                return updatedAnswers
            }
            return [...prevAnswers, { questionId, answer }]
        })
    }

    const checkAnswers = () => {
        const newScore = questions.reduce((acc, question) => {
            const userAnswer = answers.find(a => a.questionId === question.id)
            return userAnswer?.answer === question.answer ? acc + 1 : acc
        }, 0)
        console.log('Score:', newScore)
        setScore(newScore)
    }

    const resetQuiz = () => {
        setQuestions([])
        setAnswers([])
        setScore(0)
        setError(null)
        setIsQuizFinished(false)
    }

    const finishQuiz = () => {
        checkAnswers()
        setIsQuizFinished(true)
    }

    return (
        <QuizContext.Provider value={{
            questions,
            answers,
            score,
            loading,
            error,
            fetchQuestions,
            selectAnswer,
            resetQuiz,
            isQuizFinished,
            finishQuiz,
        }}>
            {children}
        </QuizContext.Provider>
    )
}

export const useQuiz = () => {
    const context = useContext(QuizContext)
    if (!context) {
        throw new Error('useQuiz must be used within a QuizProvider')
    }
    return context
}
