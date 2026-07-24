import React, { useState, useEffect } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import VisibleIcon from '../../assets/icons/VisibleIcon'
import InvisibleIcon from '../../assets/icons/InvisibleIcon'
import Modal from '../../components/Modal'

import './Questions.css'

import { useCategories } from '../../context/CategoryContext'
import { useQuestions } from '../../context/QuestionsContext'

const Questions = () => {

  const [inputValues, setInputValues] = useState({
    category: 'any',
    difficulty: 'any',
    type: 'any',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [questionType, setQuestionType] = useState('multiple');

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

  const openModal = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  }
  const handleSaveQuestion = (question) => {
    if (question.id) {
      updateQuestion(question);
    } else {
      addQuestion(question);
    }
  };

  const modalContent = (
    <div className='modal-body'>
      <header className='modal-header'>
        <h2>Question Details</h2>
      </header>
      <main className='modal-main'>
        <form className='modal-form' onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const question = Object.fromEntries(formData);
          handleSaveQuestion(question);
        }}>
          <Input
            type="text"
            id="question"
            name="question"
            label="Question"
          />
          <filedset className='modal-radio-group'>
            <legend>Question Type</legend>
            <Input
              type="radio"
              id="type-multiple"
              name="type"
              label="Multiple Choice"
              radioValue="multiple"
              value={questionType}
              onChange={() => setQuestionType('multiple')}
            />
            <Input
              className='modal-radio'
              type="radio"
              id="type-boolean"
              name="type"
              label="True-False"
              radioValue="boolean"
              value={questionType}
              onChange={() => setQuestionType('boolean')}
            />
          </filedset>
          {questionType === 'multiple' ? (
            <div className='modal-multiple-choice'>
              <Input
                type="text"
                id="option1"
                name="option1"
                label="Option 1"
              />
              <Input
                type="text"
                id="option2"
                name="option2"
                label="Option 2"
              />
              <Input
                type="text"
                id="option3"
                name="option3"
                label="Option 3"
              />
              <Input
                type="text"
                id="option4"
                name="option4"
                label="Option 4"
              />
            </div>
          ) : questionType === 'boolean' ? (
            <div className='modal-boolean'>
              <Input
                type="text"
                id="correct-true"
                name="correct"
                label="True"
              />
              <Input
                type="text"
                id="correct-false"
                name="correct"
                label="False"
              />
            </div>
          ) : null}
          <Button className='modal-btn' type="submit" text="Save Question" />
        </form>
      </main>
    </div>
  );

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
          <table className='questions-table'>
            <thead>
              <tr>
                <th>Custom Question</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customQuestions.map((question) => (
                <tr key={question.id}>
                  <td>{question.question}</td>
                  <td>
                    <VisibleIcon />
                    <InvisibleIcon />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Question Details">
          {modalContent}
        </Modal>
        <div className='actions-footer'>
          <Button className='btn-primary' text="Add Question" onClick={openModal} />
          <Button className='btn-secondary' text="Edit Question" onClick={openModal} />
          <Button className='btn-danger' text="Delete Question" />
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


//TODO: Add features to the questions page
// make the questions table more interactive
// make form react controlled