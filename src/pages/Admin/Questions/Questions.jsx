import React, { useState, useEffect } from 'react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import VisibleIcon from '../../../assets/icons/VisibleIcon';
import InvisibleIcon from '../../../assets/icons/InvisibleIcon';
import QuestionModal from './QuestionModal';
import EditIcon from '../../../assets/icons/EditIcon';
import DeleteIcon from '../../../assets/icons/DeleteIcon';
import QuestionFilters from './QuestionFilters';
import ApiQuestionsTable from './ApiQuestionsTable';
import CustomQuestionsTable from './CustomQuestionsTable';
import QuestionInsight from './QuestionInsight';
import { createFilterConfig } from './filterConfig';
import './Questions.css'

import { useCategories } from '../../../context/Admin/CategoryContext';
import { useQuestions } from '../../../context/Admin/QuestionsContext';

const Questions = () => {

  const [filters, setFilters] = useState({
    category: 'any',
    difficulty: 'any',
    type: 'any',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibilityMap, setVisibilityMap] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { categories } = useCategories();
  const { questions, loading, error, customQuestions, fetchQuestions, addQuestion, updateQuestion, deleteQuestion, fetchQuestionsCountByCategory, countByCategory } = useQuestions();

  const handleFilterChange = (name, value) => {
    setFilters(prevValues => ({ ...prevValues, [name]: value }));
  };

  const categoryOptions = [
    { value: 'any', label: 'Any Category' },
    ...categories.map(category => ({
      value: category.id,
      label: category.displayName,
    }))
  ];

  const filterConfig = createFilterConfig(categoryOptions);

  const openModal = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
    setIsEditing(false);
  }

  const handleEditQuestion = (question) => {
    setSelectedQuestion(question);
    setIsEditing(true);
    openModal();
  }

  const handleAddQuestion = () => {
    setSelectedQuestion(null);
    setIsEditing(false);
    openModal();
  }

  const handleSaveQuestion = (question) => {
    if (isEditing) {
      updateQuestion(question);
    } else {
      addQuestion(question);
    }
    closeModal();
  };

  const toggleVisibility = (questionId) => {
    setVisibilityMap(prevMap => ({
      ...prevMap,
      [questionId]: !prevMap[questionId]
    }));
  }

  const isVisible = (questionId) => {
    return visibilityMap[questionId] || false;
  }

  const { category, difficulty, type } = filters;
  useEffect(() => {
    fetchQuestions(category, type, difficulty);
  }, [category, difficulty, type]);

  useEffect(() => {
    fetchQuestionsCountByCategory(category);
  }, [category]);


  return (
    <div className='questions'>
      <section className='questions-header'>
        <h1>Questions</h1>
        <p className='lead'>Manage your questions here.</p>
      </section>
      <section className='questions-content'>
        <QuestionFilters
          config={filterConfig}
          values={filters}
          onChange={handleFilterChange}
        />
        <div className='questions-list'>
          <ApiQuestionsTable
            questions={questions}
            onToggleVisibility={toggleVisibility}
            isVisible={isVisible}
            loading={loading}
            error={error}
          />
          <QuestionInsight
            category={category}
            difficulty={difficulty}
            countByCategory={countByCategory}
          />
          <CustomQuestionsTable
            customQuestions={customQuestions}
            onEdit={handleEditQuestion}
            deleteQuestion={deleteQuestion}
          />
        </div>
        {isModalOpen && (
          <QuestionModal
            isOpen={isModalOpen}
            onClose={closeModal}
            isEditing={isEditing}
            question={selectedQuestion}
            handleSaveQuestion={handleSaveQuestion}
          />
        )}
        <div className='actions-footer'>
          <Button className='btn-primary' text="Add Question" onClick={handleAddQuestion} />
        </div>
      </section>
      <section className='questions-footer'>
        <p>Footer content for questions management.</p>
      </section>
    </div >
  )
}

export default Questions

// TODO: Add features to the questions page
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