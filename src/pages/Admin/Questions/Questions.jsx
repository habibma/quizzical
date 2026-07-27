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
  const filterConfig = [
    {
      name: "category",
      label: "Category",
      type: "select",
      options: categoryOptions,
    },
    {
      name: "difficulty",
      label: "Difficulty",
      type: "select",
      options: difficultyOptions,
    },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: typeOptions,
    },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  }

  const hadleAddQuestion = () => {
    setIsEditing(false);
    openModal();
  }
  const handleEditQuestion = (question) => {
    setIsEditing(true);
    openModal();
  }
  const handleSaveQuestion = (question) => {
    addQuestion(question); // TODO: Implement logic to determine if it's an edit or a new question
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
            questionInsightBox={questionInsightBox}
          />
          <CustomQuestionsTable
            customQuestions={customQuestions}
            openModal={openModal}
            deleteQuestion={deleteQuestion}
          />
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