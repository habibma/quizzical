import React, { useState, useEffect } from 'react'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import VisibleIcon from '../../../assets/icons/VisibleIcon'
import InvisibleIcon from '../../../assets/icons/InvisibleIcon'
import QuestionModal from './QuestionModal'
import './Questions.css'

import { useCategories } from '../../../context/Admin/CategoryContext'
import { useQuestions } from '../../../context/Admin/QuestionsContext'

const Questions = () => {

  const [inputValues, setInputValues] = useState({
    category: 'any',
    difficulty: 'any',
    type: 'any',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [questionType, setQuestionType] = useState('multiple');

  const { categories } = useCategories();
  const { questions, loading, error, customQuestions, fetchQuestions, addQuestion, updateQuestion, deleteQuestion, fetchQuestionsCountByCategory, countByCategory } = useQuestions();

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
    closeModal();
  };

  const { category, difficulty, type } = inputValues;
  useEffect(() => {
    fetchQuestions(inputValues.category, inputValues.type, inputValues.difficulty);
  }, [category, difficulty, type]);

  useEffect(() => {
    fetchQuestionsCountByCategory(category);
  }, [category]);

  const questionInsightBox = () => {
    if (category === 'any') {
      return <p>Please select a category to see the question count.</p>;
    }
    const totalQuestions = countByCategory[category]?.total_question_count || 0;
    const totalEasyQuestions = countByCategory[category]?.total_easy_question_count || 0;
    const totalMediumQuestions = countByCategory[category]?.total_medium_question_count || 0;
    const totalHardQuestions = countByCategory[category]?.total_hard_question_count || 0;

    switch (difficulty) {
      case 'any':
        return <p>Total Questions: {totalQuestions}</p>;
      case 'easy':
        return <p>Total Easy Questions: {totalEasyQuestions}</p>;
      case 'medium':
        return <p>Total Medium Questions: {totalMediumQuestions}</p>;
      case 'hard':
        return <p>Total Hard Questions: {totalHardQuestions}</p>;
      default:
        break;
    }
  }

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
            <tfoot className='questions-insight'>
              <tr>
                <td colSpan="1">Question Count Insight</td>
                <td colSpan="3">{questionInsightBox()}</td>
              </tr>
            </tfoot>
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
        {isModalOpen && (
          <QuestionModal
            isOpen={isModalOpen}
            onClose={closeModal}
            handleSaveQuestion={handleSaveQuestion}
          />
        )}
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