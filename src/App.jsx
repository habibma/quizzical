import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { getQuestions, getCategories } from './services/triviaService'
import './App.css'
// components
import Questionnaire from './components/Questionnaire'
import Input from './components/Input'
import Button from "./components/Button"
import Header from './components/Header'
import Footer from './components/Footer'
import AppRoutes from './routes/AppRoutes'

function App() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [quizzical, setQuizzical] = useState(false)
  const [score, setScore] = useState(0)
  const [subjects, setSubjects] = useState([])
  const [category, setCategory] = useState("")

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
    setScore(0)

    questions.map(question => {
      if (question.selectedOption === question.answer) {
        setScore(score => score + 1)
      } else {
        return;
      }
    })

  }

  const handleCtegoryChange = (e) => {
    setCategory(e.target.value)
  }

  useEffect(() => {
    getCategories().then(results => {
      setSubjects(results)
    })

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

  const categories = subjects.map(subject => {
    return (
      <Input
        className='subject'
        key={subject.id}
        type="radio"
        label={subject.name}
        name="category"
        id={subject.id}
        radioValue={String(subject.id)}
        value={category}
        onChange={handleCtegoryChange}
      />
    )
  })

  const startPage = (
    <section className='start-page'>
      <p>Select a subject and click "Start Quiz"</p>
      <fieldset className='subjects'>
        <legend>Subjects</legend>
        {categories.length > 0 ? categories : <p className='info'>Loading subjects...</p>}
      </fieldset>
      {category === "" && <p className='error'>Please select a subject to start the quiz!</p>}
      <Button disabled={category === ""} onClick={startQuiz} text={loading ? "Loading..." : "Start Quiz"} />
    </section>
  )

  return <AppRoutes
    theme={theme}
    toggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
    questions={questions}
    questionPage={questionPage}
    startPage={startPage}
    subjects={subjects}
    category={category}
    loading={loading}
    startQuiz={startQuiz}
    handleSelect={handleSelect}
    checkAnswer={checkAnswer}
    handleCtegoryChange={handleCtegoryChange}
  />
}

export default App
