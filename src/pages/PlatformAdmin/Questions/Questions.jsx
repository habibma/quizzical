import React, { useState, useEffect } from 'react';
import QuestionModal from './QuestionModal';
import QuestionFilters from './QuestionFilters';
import ApiQuestionsTable from './ApiQuestionsTable';
import CustomQuestionsTable from './CustomQuestionsTable';
import QuestionInsight from './QuestionInsight';
import { createFilterConfig } from './filterConfig';
import './Questions.css'

import { useCategories } from '../../../context/Admin/CategoryContext';
import { useQuestions } from '../../../context/Admin/QuestionsContext';
import { useRepo } from '../../../context/Admin/ReposContext';

import Button from '../../../components/ui/Button';

const Questions = () => {

  const [filters, setFilters] = useState({
    repository: 'any',
    category: 'any',
    difficulty: 'any',
    type: 'any',
  });
  const [filterCategories, setFilterCategories] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibilityMap, setVisibilityMap] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const { questions, loading, error, customQuestions, fetchQuestions, addQuestion, updateQuestion, deleteQuestion, fetchCategories } = useQuestions();
  const { activeRepositories } = useRepo();

  const handleFilterChange = (name, value) => {
    setFilters(prevValues => ({
      ...prevValues, [name]: value,
      ...(name == 'repository' && { category: 'any' })
     }));
  };

  const categoryOptions = [
    { value: 'any', label: 'Any Category' },
    ...filterCategories.map(category => ({
      value: category.id,
      label: category.name,
    }))
  ];

  const repositoryOptions = [
    { value: 'any', label: 'Any Repository' },
    ...activeRepositories.map(repo => ({
      value: repo.id,
      label: repo.title,
    }))
  ];

  const filterConfig = createFilterConfig(categoryOptions, repositoryOptions);

  const openModal = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
  }

  const handleEditQuestion = (question) => {
    setSelectedQuestion(question);
    openModal();
  }

  const handleAddQuestion = () => {
    setSelectedQuestion(null);
    openModal();
  }

  const handleSaveQuestion = (question) => {
    if (selectedQuestion) {
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

  const { repository, category, difficulty, type } = filters;
  useEffect(() => {
    if (repository === 'any')
      return;

    const selectedRepo = activeRepositories.find(repo => repo.id === repository);
    if (!selectedRepo) {
      return;
    }

    fetchQuestions(selectedRepo, { amount: 10, category, difficulty, type });
  }, [repository, category, difficulty, type, activeRepositories]);

  useEffect(() => {
    if (repository === 'any')
    {
      setFilterCategories([])
      return ;
    }

    const selectedRepo = activeRepositories.find(repo => repo.id === repository);

    if (!selectedRepo) return ;

    const loadCategories = async () => {
      const categories = await fetchCategories(selectedRepo);
      console.log(categories);
      setFilterCategories(categories);
    }

    loadCategories();
  }, [repository, activeRepositories]);


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
          {/* <QuestionInsight
            category={category}
            difficulty={difficulty}
            countByCategory={countByCategory}
          /> */}
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
            isEditing={!!selectedQuestion}
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