import React, { useState, useEffect, useMemo, useRef } from 'react';
import QuestionModal from './QuestionModal';
import ApiQuestionsTable from './QuestionTable';
import CustomQuestionsTable from './CustomQuestionsTable';
import { createFilterConfig } from './filterConfig';
import QuestionSummary from './QuestionSummary';
import QuestionToolbar from './QuestionToolbar';
import QuestionSection from './QuestionSection';
import './Questions.css'

import { useQuestions } from '../../../context/Admin/QuestionsContext';
import { useRepo } from '../../../context/Admin/ReposContext';
import { useApi } from '../../../context/Admin/ApiContext';

import Button from '../../../components/ui/Button';
import ConfirmDialog from '../../../components/ui/ConfirmDialog/ConfirmDialog';
import Pagination from '../../../components/ui/Pagination/Pagination';

const QUESTIONS_PAGE_SIZE = 10;

const Questions = ({ mode = 'sources', pageTitle }) => {
  const isTeacherView = mode === 'teacher';
  const heading = pageTitle || (isTeacherView ? 'Question Bank' : 'Question Sources');

  const [filters, setFilters] = useState({
    repository: 'any',
    category: 'any',
    difficulty: 'any',
    type: 'any',
  });
  const [filterCategories, setFilterCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedApiIds, setSelectedApiIds] = useState([]);
  const [selectedCustomIds, setSelectedCustomIds] = useState([]);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [apiPage, setApiPage] = useState(1);
  const importInputRef = useRef(null);
  const {
    questions,
    loading,
    error,
    customQuestions,
    fetchQuestions,
    addQuestion,
    updateQuestion,
    deleteQuestions,
    visibilityMap,
    setQuestionVisibility,
    fetchCategories,
  } = useQuestions();
  const { activeRepositories } = useRepo();
  const { apis } = useApi();
  const availableSources = useMemo(() => (
    isTeacherView
      ? activeRepositories
      : apis.filter(api => api.enabled).map(api => ({ ...api, title: api.name }))
  ), [isTeacherView, activeRepositories, apis]);

  const handleFilterChange = (name, value) => {
    setFilters(prevValues => ({
      ...prevValues, [name]: value,
      ...(name === 'repository' && { category: 'any' })
     }));
  };

  const categoryOptions = [
    { value: 'any', label: 'Any Category' },
    ...filterCategories.map(category => ({
      value: category.id,
      label: category.name,
    }))
  ];

  const apiOptions = [
    { value: 'any', label: 'Any Api' },
    ...availableSources.map(repo => ({
      value: repo.id,
      label: repo.title,
    }))
  ];

  const filterConfig = createFilterConfig(categoryOptions, apiOptions);
  const teacherFilterConfig = filterConfig.filter(filter => filter.name === 'type');

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
    const id = String(questionId);
    setQuestionVisibility([id], !visibilityMap[id]);
  }

  const isVisible = (questionId) => {
    return visibilityMap[String(questionId)] || false;
  }

  const handleSelection = (ids, isSelected, setSelectedIds) => {
    setSelectedIds((currentIds) => {
      const nextIds = new Set(currentIds);
      ids.forEach((id) => (isSelected ? nextIds.add(String(id)) : nextIds.delete(String(id))));
      return [...nextIds];
    });
  };

  const handleDeleteQuestion = (question) => {
    setQuestionToDelete({ ids: [question.id], label: 'this question' });
  };

  const handleDeleteSelected = () => {
    if (selectedCustomIds.length === 0) return;
    setQuestionToDelete({ ids: selectedCustomIds, label: `${selectedCustomIds.length} selected questions` });
  };

  const confirmDelete = () => {
    deleteQuestions(questionToDelete.ids);
    setSelectedCustomIds((ids) => ids.filter((id) => !questionToDelete.ids.includes(id)));
    setQuestionToDelete(null);
  };

  const handleBulkVisibility = (isVisibleValue) => {
    if (selectedApiIds.length === 0) return;
    setQuestionVisibility(selectedApiIds, isVisibleValue);
    setSelectedApiIds([]);
  };

  const { repository, category, difficulty, type } = filters;

  const matchesQuestionType = (question) => (
    type === 'any' || (question.type || 'multiple') === type
  );

  const filteredApiQuestions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return questions.filter((question) => (
      matchesQuestionType(question)
      && (!query || question.question.toLowerCase().includes(query))
    ));
  }, [questions, searchTerm, type]);

  const displayedApiQuestions = repository === 'any' ? [] : filteredApiQuestions;
  const apiTotalPages = Math.ceil(displayedApiQuestions.length / QUESTIONS_PAGE_SIZE);
  const paginatedApiQuestions = displayedApiQuestions.slice(
    (apiPage - 1) * QUESTIONS_PAGE_SIZE,
    apiPage * QUESTIONS_PAGE_SIZE
  );

  const filteredCustomQuestions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return customQuestions.filter((question) => (
      matchesQuestionType(question)
      && (!query || question.question.toLowerCase().includes(query))
    ));
  }, [customQuestions, searchTerm, type]);

  const clearFilters = () => {
    setFilters({ repository: 'any', category: 'any', difficulty: 'any', type: 'any' });
    setSearchTerm('');
    setApiPage(1);
  };

  const exportQuestions = () => {
    const data = JSON.stringify(customQuestions, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quizical-custom-questions.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importQuestions = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const importedQuestions = JSON.parse(reader.result);
        if (!Array.isArray(importedQuestions)) throw new Error('The file must contain an array of questions.');
        importedQuestions.forEach((question) => {
          if (question.question && question.type) addQuestion({ ...question, id: undefined });
        });
      } catch {
        window.alert('Unable to import questions. Use a valid JSON question array.');
      }
      event.target.value = '';
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    setApiPage(1);
  }, [searchTerm, repository, category, difficulty, type]);

  useEffect(() => {
    if (isTeacherView || repository === 'any')
      return;

    const selectedRepo = availableSources.find(repo => String(repo.id) === String(repository));
    console.log("Selected repository:", selectedRepo);
    if (!selectedRepo) {
      return;
    }

    setApiPage(1);
    setSelectedApiIds([]);
    fetchQuestions(selectedRepo, { amount: 50, category, difficulty, type });
  }, [isTeacherView, repository, category, difficulty, type, availableSources]);

  useEffect(() => {
    if (isTeacherView || repository === 'any')
    {
      setFilterCategories([])
      return ;
    }

    const selectedRepo = availableSources.find(repo => String(repo.id) === String(repository));

    if (!selectedRepo) return ;

    const loadCategories = async () => {
      const categories = await fetchCategories(selectedRepo);
      setFilterCategories(categories);
    }

    loadCategories();
  }, [isTeacherView, repository, availableSources]);


  return (
    <div className='questions'>
      <section className='questions-header'>
        <div>
          <p className='questions-eyebrow'>Platform Admin</p>
          <h1>{heading}</h1>
          <p className='lead'>{isTeacherView ? 'Create, organize, and maintain questions for your quizzes.' : 'Review questions provided by connected API repositories.'}</p>
        </div>
        {isTeacherView && <Button className='btn-primary' text="Add Question" onClick={handleAddQuestion} />}
      </section>
      <section className='questions-content'>
        <QuestionSummary
          apiCount={isTeacherView ? 0 : displayedApiQuestions.length}
          customCount={isTeacherView ? filteredCustomQuestions.length : 0}
          visibleCount={isTeacherView ? 0 : displayedApiQuestions.filter((question) => isVisible(question.id)).length}
          selectedRepository={isTeacherView ? 'My question library' : activeRepositories.find((repo) => repo.id === repository)?.title}
        />
        <QuestionToolbar
          config={isTeacherView ? teacherFilterConfig : filterConfig}
          values={filters}
          onChange={handleFilterChange}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClear={clearFilters}
          resultCount={displayedApiQuestions.length + filteredCustomQuestions.length}
          onExport={isTeacherView ? exportQuestions : undefined}
          onImport={isTeacherView ? () => importInputRef.current?.click() : undefined}
        />
        {isTeacherView && <input ref={importInputRef} className="question-import-input" type="file" accept="application/json" onChange={importQuestions} />}
        {isTeacherView && selectedCustomIds.length > 0 && (
          <div className="question-bulk-actions">
            <span>{selectedCustomIds.length} selected</span>
            <Button className="btn-danger" text="Delete selected" onClick={handleDeleteSelected} />
          </div>
        )}
        <div className='questions-list'>
          {!isTeacherView && <QuestionSection
            title="API Questions"
            description={repository === 'any' ? 'Choose a repository to load external questions.' : 'Questions fetched from the selected repository.'}
            count={displayedApiQuestions.length}
          >
          <ApiQuestionsTable
            questions={paginatedApiQuestions}
            onToggleVisibility={toggleVisibility}
            isVisible={isVisible}
            loading={loading}
            error={error}
            selectedIds={selectedApiIds}
            onSelect={(ids, checked) => handleSelection(ids, checked, setSelectedApiIds)}
            onRetry={() => {
              const selectedRepo = availableSources.find((repo) => String(repo.id) === String(repository));
              if (selectedRepo) fetchQuestions(selectedRepo, { amount: 50, category, difficulty, type });
            }}
          />
          <Pagination
            currentPage={apiPage}
            totalPages={apiTotalPages}
            onPageChange={setApiPage}
          />
          </QuestionSection>}
          {isTeacherView && <QuestionSection
            title="Custom Questions"
            description="Questions created by your team and stored locally."
            count={filteredCustomQuestions.length}
          >
          <CustomQuestionsTable
            customQuestions={filteredCustomQuestions}
            onEdit={handleEditQuestion}
            onDelete={handleDeleteQuestion}
            selectedIds={selectedCustomIds}
            onSelect={(ids, checked) => handleSelection(ids, checked, setSelectedCustomIds)}
          />
          </QuestionSection>}
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
        <div className='actions-footer' />
      </section>
      <ConfirmDialog
        isOpen={Boolean(questionToDelete)}
        title="Delete questions?"
        message={`Are you sure you want to delete ${questionToDelete?.label || 'the selected questions'}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onClose={() => setQuestionToDelete(null)}
      />
    </div >
  )
}

export default Questions
