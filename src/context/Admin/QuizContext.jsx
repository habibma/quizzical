import { createContext, useEffect, useState, useContext } from 'react'

const QuizContext = createContext()
const STORAGE_KEY = 'quizzes'

const loadQuizzes = () => {
  const stored = localStorage.getItem(STORAGE_KEY)

  if (!stored) return []

  try {
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState(loadQuizzes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addQuiz = (quiz) => {
    setQuizzes(prevQuizzes => [...prevQuizzes, quiz]);
  }

  const updateQuiz = (updatedQuiz) => {
    setQuizzes(prevQuizzes => prevQuizzes.map(quiz => quiz.id === updatedQuiz.id ? updatedQuiz : quiz));
  }

  const deleteQuiz = (quizId) => {
    setQuizzes(prevQuizzes => prevQuizzes.filter(quiz => quiz.id !== quizId));
  }

  const getQuizById = (quizId) => {
    return quizzes.find(quiz => quiz.id === quizId);
  }

  const fetchQuizzes = async () => {
    setLoading(true);
    setError(null);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
  }, [quizzes]);

  const value = {
    quizzes,
    loading,
    setLoading,
    error,
    setError,
    addQuiz,
    updateQuiz,
    deleteQuiz,
    getQuizById,
    fetchQuizzes
  };

  return (
    <QuizContext.Provider value={value}>
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
