import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Questions from './Questions'
import Input from './components/Input'
import { getQuestions, getCategories } from './services/triviaService'

function App() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [quizzical, setQuizzical] = useState(false)
  const [score, setScore] = useState(0)
  const [subjects, setSubjects] = useState([])
  const [category, setCategory] = useState("")

  const startQuiz = () => {
    setLoading(true)
    setQuizzical(false)

    getQuestions({ amount: 5, category, difficulty: "easy", type: "multiple" }).then(results => {
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
  }, [])

  const QuestionPage = (
    <section className='questions-page'>
          <ul>
            <Questions
              questions={questions}
              onChange={handleSelect}
              quizzical={quizzical}
            />
          </ul>
          {quizzical ?
            <div className='score-borad'><span>You scored {score}/5 correct answers</span><button onClick={startQuiz}>Play again</button></div>
            :
            <button onClick={checkAnswer}>Check answers</button>
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
      <h1>Quizzical</h1>
      <p>Select a subject and click "Start Quiz"</p>
      <fieldset className='subjects'>
        <legend>Subjects</legend>
        {categories.length > 0 ? categories : <p className='info'>Loading subjects...</p>}
      </fieldset>
      {category === "" && <p className='error'>Please select a subject to start the quiz</p>}
      <button onClick={startQuiz}>{loading ? "Loading..." : "Start Quiz"}</button>
    </section>
  )

  return (
    <div className='container'>
      {questions.length > 0 ?
        QuestionPage
        :
        startPage
      }
      <footer><small>Coded by <a href='https://habibmote.com/' target='_blank'>Habib Mote</a></small></footer>
    </div>
  )
}

export default App
