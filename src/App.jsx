import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Questions from './Questions'
import Input from './components/Input'

function App() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [quizzical, setQuizzical] = useState(false)
  const [score, setScore] = useState(0)
  const [category, setCategory] = useState("")

  const startQuiz = () => {
    setLoading(true)
    setQuizzical(false)
    async function fetchRequest() {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=easy&type=multiple`)
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        setLoading(false)
        throw new Error(message);
      }
      const data = await response.json();
      return data.results
    }

    fetchRequest().then(results => {

      const newArray = []
      results.map(obj => newArray.push({
        id: nanoid(),
        question: obj.question,
        answer: obj.correct_answer,
        options: obj.incorrect_answers.map(option => ({ id: nanoid(), option })).concat({ id: nanoid(), option: obj.correct_answer }).sort((a, b) => 0.5 - Math.random()),
        selectedOption: "",
      }))

      setQuestions(newArray)

      setLoading(false)
    })
  }

  const handleSelect = ({ target }) => {
    setCategory(target.value)
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

  const [subjects, setSubjects] = useState([])
  const fetchSubjects = () => {
    async function fetchRequest() {
      const response = await fetch('https://opentdb.com/api_category.php')
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      return data.trivia_categories
    }

    fetchRequest().then(results => {
      setSubjects(results)
    })
  }

  useEffect(() => {
    fetchSubjects()
  }, [])

  return (
    <div className='container'>
      {questions.length > 0 ?
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
        :
        <section className='start-page'>
          <h1>Quizzical</h1>
          <p>Select a subject and click "Start Quiz"</p>
          <div className='subjects'>
            <ul>
              {subjects.map(subject => {
                return (
                  <li key={subject.id}>
                    <Input
                      type="radio"
                      value={subject.id}
                      onChange={handleSelect}
                    />
                    <p>{subject.name}</p>
                  </li>
                )
              })}
            </ul>
          </div>
          <button onClick={startQuiz}>{loading ? "Loading..." : "Start Quiz"}</button>
        </section>
      }
      <footer><small>Coded by <a href='https://habibmote.com/' target='_blank'>Habib Mote</a></small></footer>
    </div>
  )
}

export default App
