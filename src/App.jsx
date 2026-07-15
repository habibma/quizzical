import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { getQuestions } from './services/triviaService'
import { useCategories } from './context/CategoryContext.jsx'
import { useSettings } from './context/SettingsContext.jsx'
import './App.css'
// components
import Questionnaire from './components/Questionnaire'
import Button from "./components/Button"
import Header from './components/Header'
import Footer from './components/Footer'
import AppRoutes from './routes/AppRoutes'

function App() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [quizzical, setQuizzical] = useState(false)
  const [score, setScore] = useState(0)
  const [category, setCategory] = useState("")
  const { categories } = useCategories();
  const { settings } = useSettings();

  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState(prefersDarkMode ? "dark" : "light")

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light")
  }

  const startQuiz = () => {
    setLoading(true)
    setQuizzical(false)

    const params = {
      amount: settings.numQuestions,
      category,
      difficulty: settings.difficulty,
      type: settings.questionType
    }

    getQuestions(params).then(results => {
      const newArray = results.map(question => {
        return {
          ...question,
          id: nanoid(),
          selectedOption: ""
        }
      })

      setQuestions(newArray)

      setLoading(false)
    })
  }

  const handleSelect = ({ target }) => {
    setQuestions(prevQuetions => prevQuetions.map(question => {
      if (question.id === target.parentElement.parentElement.parentElement.id) {
        return { ...question, selectedOption: target.value }
      }
      return question;
    }))
  }

  //to end quiz
  const checkAnswer = () => {
    // set quizzical state so that it can be used for disabling radio buttons and more
    setQuizzical(true)
    let correctCount = 0

    questions.forEach(question => {
      if (question.selectedOption === question.answer) {
        correctCount++
      }
    })

    setScore(correctCount)
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme])

  return <AppRoutes
    theme={theme}
    toggleTheme={toggleTheme}
    setTheme={setTheme}
    questions={questions}
    category={category}
    loading={loading}
    startQuiz={startQuiz}
    handleSelect={handleSelect}
    quizzical={quizzical}
    score={score}
    checkAnswer={checkAnswer}
    handleCategoryChange={handleCategoryChange}
  />
}

export default App
