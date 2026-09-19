import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuiz } from '../../../context/Public/QuizContext.jsx'
import Questionnaire from './Questionnaire'
import Button from "../../../components/ui/Button"

import './Quiz.css'

function Quiz() {

  const { questions, answers, loading, error, selectAnswer, finishQuiz, isQuizFinished } = useQuiz();
  const navigate = useNavigate();
  const [validationMessage, setValidationMessage] = useState('');

  const handleSelect = (questionId, answerId) => {
    selectAnswer(questionId, answerId);
    setValidationMessage('');
  };

  const answeredCount = questions.filter(question =>
    answers.some(answer => answer.questionId === question.id)
  ).length;

  const handleCheckAnswers = () => {
    const unansweredCount = questions.length - answeredCount;

    if (unansweredCount > 0) {
      setValidationMessage(`Answer ${unansweredCount} remaining ${unansweredCount === 1 ? 'question' : 'questions'} before checking your answers.`);
      return;
    }

    setValidationMessage('');
    finishQuiz();
  };

  const navigateToResult = () => {
    navigate('/result');
  }

  const hasQuestions = !loading && !error && questions.length > 0;

  return (
    <main className='quiz-page'>
      <header className='quiz-page__header'>
        <div>
          <p className='quiz-page__eyebrow'>Quiz in progress</p>
          <h1>Test your knowledge</h1>
        </div>
        {hasQuestions && (
          <p className='quiz-progress' aria-live='polite'>
            {answeredCount} of {questions.length} answered
          </p>
        )}
      </header>

      {loading ? (
        <div className='quiz-state' role='status'>
          <p>Loading questions...</p>
        </div>
      ) : error ? (
        <div className='quiz-state quiz-state--error' role='alert'>
          <h2>We could not load this quiz</h2>
          <p>{error}</p>
          <button type='button' className='btn btn-secondary' onClick={() => navigate('/custom-quiz')}>
            Back to quiz builder
          </button>
        </div>
      ) : !hasQuestions ? (
        <div className='quiz-state'>
          <h2>No questions available</h2>
          <p>Choose a subject and settings to build a quiz.</p>
          <button type='button' className='btn btn-primary' onClick={() => navigate('/custom-quiz')}>
            Build a quiz
          </button>
        </div>
      ) : (
        <>
        <Questionnaire
          questions={questions}
          onChange={handleSelect}
          isQuizFinished={isQuizFinished}
          answers={answers}
        />
        {validationMessage && (
          <p className='quiz-validation' role='alert'>{validationMessage}</p>
        )}
        <div className='action-buttons'>
          <Button
            onClick={handleCheckAnswers}
            disabled={isQuizFinished}
            className='btn btn-primary'
            text={isQuizFinished ? 'Answers checked' : 'Check answers'}
          />
          <Button
            onClick={navigateToResult}
            disabled={!isQuizFinished}
            className='btn btn-secondary'
            text='View result'
          />
        </div>
        </>
      )}
    </main>
  )
}

export default Quiz