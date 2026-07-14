import React from 'react'
import Questionnaire from '../../components/Questionnaire'
import Button from "../../components/Button"

function Quiz({ questions, handleSelect, quizzical, score, startQuiz, checkAnswer }) {
  return (
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
}

export default Quiz