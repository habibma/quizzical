import { useState } from 'react'
import { useQuiz } from '../../../context/Admin/QuizContext'

import './Quizzes.css'

const QuizCard = ({ quiz, onEdit, onDelete, onDuplicate, onPublish }) => {
  return (
    <div className='quiz-card'>
      <h3 className='quiz-card--header'>{quiz.title}</h3>
      <p>{quiz.description}</p>
      <p>Category: {quiz.category}</p>
      <p>Number of Questions: {quiz.questions.length}</p>
      <p>Difficulty: {quiz.difficulty}</p>
      <p>Repository: </p>
      <ul>
        {quiz.repositories.map(repo => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
      <p>Created: {quiz.createdAt}</p>
      <p>Last Updated: {quiz.updatedAt}</p>
      <p>Time Limit: {quiz.timeLimit} minutes</p>
      <p>Status: {quiz.isPublished ? 'Published' : 'Draft'}</p>
      <div className='quiz-card-actions'>
        <button className='btn-primary' onClick={() => onEdit(quiz.id, quiz)}>
          Edit
        </button>
        <button className='btn-secondary' onClick={() => {}}>
          Preview
        </button>
        <button className='btn-success' onClick={() => onDuplicate(quiz.id)}>
          Duplicate
        </button>
        <button className='btn-warning' onClick={() => onPublish(quiz.id)}>
          Publish
        </button>
        <button className='btn-danger' onClick={() => onDelete(quiz.id)}>
          Delete
        </button>
      </div>
    </div>
  )
}

const Quizzes = () => {

  const { quizzes, loading, error, addQuiz, updateQuiz, deleteQuiz } = useQuiz();

  const handleAddQuiz = () => {
    const newQuiz = {
      id: Date.now(),
      title: 'New Quiz',
      description: 'A new quiz',
      category: 'General',
      questions: [],
      repositories: [],
      difficulty: 'Medium',
      timeLimit: 10,
      isPublished: false,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    };
    addQuiz(newQuiz);
  };

  const handleEditQuiz = (quizId, updatedQuiz) => {
    const quizToUpdate = quizzes.find(quiz => quiz.id === quizId);
    if (quizToUpdate) {
      const updatedQuizData = {
        ...quizToUpdate,
        ...updatedQuiz,
        updatedAt: new Date().toDateString(),
      };
      updateQuiz(updatedQuizData);
    }
  }

  const handleDeleteQuiz = (quizId) => {
    deleteQuiz(quizId);
  }

  const handleDuplicateQuiz = (quizId) => {
    const quizToDuplicate = quizzes.find(quiz => quiz.id === quizId);
    if (quizToDuplicate) {
      const newQuiz = {
        ...quizToDuplicate,
        id: Date.now(),
        title: `${quizToDuplicate.title} (Copy)`,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
      };
      addQuiz(newQuiz);
    }
  };

  const handlePublishQuiz = (quizId) => {
    const quizToPublish = quizzes.find(quiz => quiz.id === quizId);
    if (quizToPublish) {
      const updatedQuizData = {
        ...quizToPublish,
        isPublished: true,
        updatedAt: new Date().toDateString(),
      };
      updateQuiz(updatedQuizData);
    }
  };

  return (
    <div className='quizzes'>
      <section className='quizzes-header'>
        <h1>Quizzes</h1>
        <p className='lead'>Manage your quizzes here.</p>
      </section>
      <section className='quizzes-content'>
        <div className='quizzes-add'>
          <button className='btn btn-primary' onClick={handleAddQuiz}>
            Add Quiz +
          </button>
        </div>
        <div className='quizzes-list'>
          {loading && <p>Loading quizzes...</p>}
          {error && <p className='error'>{error}</p>}
          {!loading && !error && quizzes.length === 0 && <p>No quizzes available.</p>}
          {!loading && !error && quizzes.length > 0 && (
            <div className='quizzes-grid'>
              {quizzes.map(quiz => (
                <QuizCard key={quiz.id} quiz={quiz} onEdit={handleEditQuiz} onDelete={handleDeleteQuiz} onDuplicate={handleDuplicateQuiz} onPublish={handlePublishQuiz} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Quizzes
