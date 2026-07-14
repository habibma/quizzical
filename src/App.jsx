import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { getQuestions } from './services/triviaService'
import { useCategories } from './context/CategoryContext.jsx'
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

  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useState(prefersDarkMode ? "dark" : "light")

  const startQuiz = () => {
    setLoading(true)
    setQuizzical(false)

    const settings = {
      amount: 5,
      category: category,
      difficulty: "easy",
      type: "multiple"
    }

    getQuestions(settings).then(results => {
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

  const questionPage = (
    <section className='questions-page'>
      <ul>
        <Questionnaire
          questions={questions}
          onChange={handleSelect}
          quizzical={quizzical}
        />
      </ul>
      {quizzical ?
        <div className='score-borad'><span>You scored {score}/5 correct answers</span><Button onClick={startQuiz} text="Play again" /></div>
        :
        <Button onClick={checkAnswer} text="Check answers" />
      }
    </section>
  )

  return <AppRoutes
    theme={theme}
    toggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
    questions={questions}
    questionPage={questionPage}
    category={category}
    loading={loading}
    startQuiz={startQuiz}
    handleSelect={handleSelect}
    checkAnswer={checkAnswer}
    handleCategoryChange={handleCategoryChange}
  />
}

export default App
