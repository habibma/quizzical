import React, { useState, useEffect, useMemo, useRef } from 'react';
import QuestionModal from './QuestionModal';
import ApiQuestionsTable from './ApiQuestionsTable';
import CustomQuestionsTable from './CustomQuestionsTable';
import { createFilterConfig } from './filterConfig';
import QuestionSummary from './QuestionSummary';
import QuestionToolbar from './QuestionToolbar';
import QuestionSection from './QuestionSection';
import ConfirmQuestionDialog from './ConfirmQuestionDialog';
import './Questions.css'

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
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedApiIds, setSelectedApiIds] = useState([]);
  const [selectedCustomIds, setSelectedCustomIds] = useState([]);
  const [questionToDelete, setQuestionToDelete] = useState(null);
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

  const filteredApiQuestions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return questions.filter((question) => !query || question.question.toLowerCase().includes(query));
  }, [questions, searchTerm]);

  const displayedApiQuestions = repository === 'any' ? [] : filteredApiQuestions;

  const filteredCustomQuestions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return customQuestions.filter((question) => !query || question.question.toLowerCase().includes(query));
  }, [customQuestions, searchTerm]);

  const clearFilters = () => {
    setFilters({ repository: 'any', category: 'any', difficulty: 'any', type: 'any' });
    setSearchTerm('');
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
    if (repository === 'any')
      return;

    const selectedRepo = activeRepositories.find(repo => repo.id === repository);
    console.log("Selected repository:", selectedRepo);
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
      setFilterCategories(categories);
    }

    loadCategories();
  }, [repository, activeRepositories]);


  return (
    <div className='questions'>
      <section className='questions-header'>
        <div>
          <p className='questions-eyebrow'>Platform Admin</p>
          <h1>Questions</h1>
          <p className='lead'>Manage, review, and curate your question library.</p>
        </div>
        <Button className='btn-primary' text="Add Question" onClick={handleAddQuestion} />
      </section>
      <section className='questions-content'>
        <QuestionSummary
          apiCount={displayedApiQuestions.length}
          customCount={filteredCustomQuestions.length}
          visibleCount={displayedApiQuestions.filter((question) => isVisible(question.id)).length}
          selectedRepository={activeRepositories.find((repo) => repo.id === repository)?.title}
        />
        <QuestionToolbar
          config={filterConfig}
          values={filters}
          onChange={handleFilterChange}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClear={clearFilters}
          resultCount={displayedApiQuestions.length + filteredCustomQuestions.length}
          onExport={exportQuestions}
          onImport={() => importInputRef.current?.click()}
        />
        <input ref={importInputRef} className="question-import-input" type="file" accept="application/json" onChange={importQuestions} />
        {(selectedApiIds.length > 0 || selectedCustomIds.length > 0) && (
          <div className="question-bulk-actions">
            {selectedApiIds.length > 0 && <>
              <span>{selectedApiIds.length} API selected</span>
              <Button className="btn-secondary" text="Show selected" onClick={() => handleBulkVisibility(true)} />
              <Button className="btn-secondary" text="Hide selected" onClick={() => handleBulkVisibility(false)} />
            </>}
            {selectedCustomIds.length > 0 && <>
              <span>{selectedCustomIds.length} custom selected</span>
              <Button className="btn-danger" text="Delete selected" onClick={handleDeleteSelected} />
            </>}
          </div>
        )}
        <div className='questions-list'>
          <QuestionSection
            title="API Questions"
            description={repository === 'any' ? 'Choose a repository to load external questions.' : 'Questions fetched from the selected repository.'}
            count={displayedApiQuestions.length}
          >
          <ApiQuestionsTable
            questions={displayedApiQuestions}
            onToggleVisibility={toggleVisibility}
            isVisible={isVisible}
            loading={loading}
            error={error}
            selectedIds={selectedApiIds}
            onSelect={(ids, checked) => handleSelection(ids, checked, setSelectedApiIds)}
            onRetry={() => {
              const selectedRepo = activeRepositories.find((repo) => repo.id === repository);
              if (selectedRepo) fetchQuestions(selectedRepo, { amount: 10, category, difficulty, type });
            }}
          />
          </QuestionSection>
          <QuestionSection
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
          </QuestionSection>
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
      <ConfirmQuestionDialog
        isOpen={Boolean(questionToDelete)}
        title="Delete questions?"
        message={`Are you sure you want to delete ${questionToDelete?.label || 'the selected questions'}? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onClose={() => setQuestionToDelete(null)}
      />
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