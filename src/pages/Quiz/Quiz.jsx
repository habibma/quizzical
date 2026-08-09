import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../../context/Public/QuizContext.jsx'
import Questionnaire from './Questionnaire'
import Button from "../../components/Button"

import './Quiz.css'

function Quiz() {

  const { questions, answers, score, loading, error, fetchQuestions, selectAnswer, finishQuiz, resetQuiz, isQuizFinished } = useQuiz();
  const navigate = useNavigate();

  const handleSelect = (questionId, answerId) => {
    selectAnswer(questionId, answerId);
  };

  const navigateToResult = () => {
    navigate('/result');
  }

  return (
    <section className='quiz-page'>
      <Questionnaire
        questions={questions}
        onChange={handleSelect}
        isQuizFinished={isQuizFinished}
        answers={answers}
      />
      <div className='action-buttons'>
        <Button onClick={finishQuiz} text="Check answers" />
        <Button onClick={navigateToResult} text="Result" />
      </div>
    </section>
  )
}

export default Quiz