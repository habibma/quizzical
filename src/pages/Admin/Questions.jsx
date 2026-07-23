import React, { useState, useEffect } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import VisibleIcon from '../../assets/icons/VisibleIcon'
import InvisibleIcon from '../../assets/icons/InvisibleIcon'

import './Questions.css'

import { useCategories } from '../../context/CategoryContext'
import { useQuestions } from '../../context/QuestionsContext'

const Questions = () => {

  const [inputValues, setInputValues] = useState({
    category: 'any',
    difficulty: 'any',
    type: 'any',
  });

  const { categories } = useCategories();
  const { questions, loading, error, customQuestions, fetchQuestions, addQuestion, updateQuestion, deleteQuestion } = useQuestions();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const categoryOptions = [
    { value: 'any', label: 'Any Category' },
    ...categories.map(category => ({
      value: category.id,
      label: category.displayName,
    }))
  ];

  const difficultyOptions = [
    { value: 'any', label: 'Any Difficulty' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ];

  const typeOptions = [
    { value: 'any', label: 'Any Type' },
    { value: 'multiple', label: 'Multiple Choice' },
    { value: 'boolean', label: 'True-False' },
  ];

  const { category, difficulty, type } = inputValues;
  useEffect(() => {
    fetchQuestions(inputValues.category, inputValues.type, inputValues.difficulty);
  }, [category, difficulty, type]);

  return (
    <div className='questions'>
      <section className='questions-header'>
        <h1>Questions</h1>
        <p className='lead'>Manage your questions here.</p>
      </section>
      <section className='questions-content'>
        <div className='questions-actions'>
          <Input as="select" options={categoryOptions} id="category" name="category" label="Category" value={inputValues.category} onChange={handleInputChange} />
          <Input as="select" options={difficultyOptions} id="difficulty" name="difficulty" label="Difficulty" value={inputValues.difficulty} onChange={handleInputChange} />
          <Input as="select" options={typeOptions} id="type" name="type" label="Type" value={inputValues.type} onChange={handleInputChange} />
        </div>
        <div className='questions-list'>
          <table className='questions-table'>
            <thead>
              <tr>
                <th>Question</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="2">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="2">Error: {error}</td>
                </tr>
              ) : questions.length === 0 ? (
                <tr>
                  <td colSpan="2">No questions found.</td>
                </tr>
              ) :
                (
                  questions.map((question, index) => (
                    <tr key={question.id}>
                      <td>{question.question}</td>
                      <td>
                        <VisibleIcon />
                        <InvisibleIcon />
                      </td>
                    </tr>
                  ))
                )}
            </tbody>
          </table>
        </div>
        <div className='questions-modal'>
          <p>Modal for question details will be displayed here.</p>
        </div>
        <div className='actions-footer'>
          <button className='btn-primary'>Add Question</button>
          <button className='btn-secondary'>Edit Question</button>
          <button className='btn-danger'>Delete Question</button>
        </div>
      </section>
      <section className='questions-footer'>
        <p>Footer content for questions management.</p>
      </section>
    </div >
  )
}

export default Questions

// First version (API-based)
// ✅ Select category
// ✅ Select difficulty
// ✅ Select type
// ✅ Fetch questions from API
// ✅ View question details in a modal
// Future version (your own backend)
// ✅ Add question
// ✅ Edit question
// ✅ Delete question
// ✅ Search questions
// ✅ Filter by category
// ✅ Import/Export questions
// ✅ Bulk actions