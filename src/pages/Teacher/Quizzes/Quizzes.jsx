import { useMemo, useState } from 'react'
import { useQuiz } from '../../../context/Admin/QuizContext'
import { useRepo } from '../../../context/Admin/ReposContext'
import { useCategories } from '../../../context/Admin/CategoryContext'
import { useQuestions } from '../../../context/Admin/QuestionsContext'

import QuizCard from './QuizCard'
import QuizModal from './QuizModal'
import ConfirmDialog from '../../../components/ui/ConfirmDialog/ConfirmDialog'
import Modal from '../../../components/ui/Modal'

import './Quizzes.css'


const createEmptyQuiz = () => ({
  general: {
    title: '',
    description: '',
  },
  content: {
    repositories: [],
    categories: [],
    questionIds: [],
    questionCount: 0,
    questionSelection: 'random',
  },
  rules: {
    difficulty: 'easy',
    timeLimit: 0,
    attempts: 0,
    pointsCorrect: 0,
    pointsWrong: 0,
    pointsSkipped: 0,
    passingScore: 0,
  },
  rewards: {
    completionXP: 0,
    passXP: 0,
    perfectScoreXP: 0,
  },
  access: {
    status: 'draft',
    visibility: 'class',
  },
});

const Quizzes = () => {

  const [inputValues, setInputValues] = useState(createEmptyQuiz());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [previewQuiz, setPreviewQuiz] = useState(null);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('updated');

  const { quizzes, loading, error, addQuiz, updateQuiz, deleteQuiz } = useQuiz();

  const { activeRepositories } = useRepo();
  const { getActiveCategories } = useCategories();
  const { customQuestions } = useQuestions();

  const activeCategories = getActiveCategories(inputValues.content.repositories);

  const repositoryOptions = activeRepositories.map(repo => ({
    value: repo.id,
    label: repo.title,
  }));
  const categoryOptions = activeCategories.map(category => ({
    value: `${category.repositoryId}-${category.id}`,
    label: category.displayName,
  }));
  const questionOptions = customQuestions.map(question => ({
    value: String(question.id),
    label: question.question,
  }));


  // input change handler for the modal form
  const handleInputChange = (section, e) => {
    const { name, value, type, multiple, selectedOptions } = e.target;

    const newValue = multiple
      ? Array.from(selectedOptions, option => option.value)
      : type === 'number' ? Number(value) : value;

    setInputValues(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: newValue,
      },
    }));
  };

  // functions to handle quiz actions
  const handleAddQuiz = () => {
    const newQuiz = {
      id: Date.now(),
      ...inputValues,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    };
    addQuiz(newQuiz);
  };

  const handleDeleteQuiz = (quizId) => {
    setQuizToDelete(quizzes.find(quiz => quiz.id === quizId) ?? null);
  }

  const confirmDeleteQuiz = () => {
    if (quizToDelete) deleteQuiz(quizToDelete.id);
    setQuizToDelete(null);
  };

  const handleDuplicateQuiz = (quizId) => {
    const quizToDuplicate = quizzes.find(quiz => quiz.id === quizId);

    if (quizToDuplicate) {
      const newQuiz = {
        ...quizToDuplicate,
        id: Date.now(),

        general: {
          ...quizToDuplicate.general,
          title: `${quizToDuplicate.general.title} (Copy)`,
        },

        access: {
          ...quizToDuplicate.access,
          status: 'draft',
        },

        isPublished: false,
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
        access: { ...quizToPublish.access, status: 'published' },
        updatedAt: new Date().toDateString(),
      };
      updateQuiz(updatedQuizData);
    }
  };

  const handleArchiveQuiz = (quizId) => {
    const quizToArchive = quizzes.find(quiz => quiz.id === quizId);
    if (!quizToArchive) return;
    updateQuiz({
      ...quizToArchive,
      isPublished: false,
      access: { ...quizToArchive.access, status: 'archived' },
      updatedAt: new Date().toDateString(),
    });
  };

  const filteredQuizzes = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return quizzes
      .filter(quiz => {
        const status = quiz.access?.status ?? (quiz.isPublished ? 'published' : 'draft');
        const matchesSearch = !query || `${quiz.general?.title ?? ''} ${quiz.general?.description ?? ''}`.toLowerCase().includes(query);
        const matchesStatus = statusFilter === 'all' || status === statusFilter;
        const matchesVisibility = visibilityFilter === 'all' || quiz.access?.visibility === visibilityFilter;
        return matchesSearch && matchesStatus && matchesVisibility;
      })
      .sort((first, second) => {
        if (sortOrder === 'title') return (first.general?.title ?? '').localeCompare(second.general?.title ?? '');
        if (sortOrder === 'status') return (first.access?.status ?? '').localeCompare(second.access?.status ?? '');
        return String(second.updatedAt ?? '').localeCompare(String(first.updatedAt ?? ''));
      });
  }, [quizzes, searchTerm, statusFilter, visibilityFilter, sortOrder]);

  // functions to handle modal open/close and save
  const handleCloseModal = () => {
    const baseline = editingQuiz ?? createEmptyQuiz();
    const isDirty = JSON.stringify(inputValues) !== JSON.stringify(baseline);
    if (isModalOpen && isDirty && !window.confirm('Discard your unsaved quiz changes?')) return;
    setIsModalOpen(false);
    setEditingQuiz(null);
  }

  const closeSavedModal = () => {
    setIsModalOpen(false);
    setEditingQuiz(null);
  };

  const handleOpenEditModal = (quiz) => {
    setEditingQuiz(quiz);
    setInputValues(quiz);
    setIsModalOpen(true);
  }

  const handleOpenCreateModal = () => {
    setEditingQuiz(null);
    setInputValues(createEmptyQuiz());
    setIsModalOpen(true);
  }

  const handleSaveQuiz = () => {
    if (editingQuiz) {
      updateQuiz({
        ...editingQuiz,
        ...inputValues,
        updatedAt: new Date().toDateString(),
      });
    } else {
      addQuiz({
        id: Date.now(),
        ...inputValues,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
      });
    }

    closeSavedModal();
  };

  const modalProps = {
    isOpen: isModalOpen,
    onClose: handleCloseModal,
    quiz: editingQuiz,
    onSave: handleSaveQuiz,
    isEditing: !!editingQuiz,
    inputValues: inputValues,
    onInputChange: handleInputChange,
    repositoryOptions: repositoryOptions,
    categoryOptions: categoryOptions,
    questionOptions,
  };

  return (
    <div className='quizzes'>
      <section className='quizzes-header'>
        <h1>Quizzes</h1>
        <p className='lead'>Manage your quizzes here.</p>
      </section>
      <section className='quizzes-content'>
        <div className='quizzes-toolbar'>
          <label className='quiz-search'>
            <span>Search quizzes</span>
            <input type='search' value={searchTerm} onChange={event => setSearchTerm(event.target.value)} placeholder='Search by title or description' />
          </label>
          <label>
            <span>Status</span>
            <select value={statusFilter} onChange={event => setStatusFilter(event.target.value)}>
              <option value='all'>All statuses</option>
              <option value='draft'>Draft</option>
              <option value='published'>Published</option>
              <option value='archived'>Archived</option>
            </select>
          </label>
          <label>
            <span>Visibility</span>
            <select value={visibilityFilter} onChange={event => setVisibilityFilter(event.target.value)}>
              <option value='all'>All visibility</option>
              <option value='public'>Public</option>
              <option value='private'>Private</option>
              <option value='class'>Class</option>
              <option value='school'>School</option>
            </select>
          </label>
          <label>
            <span>Sort</span>
            <select value={sortOrder} onChange={event => setSortOrder(event.target.value)}>
              <option value='updated'>Recently updated</option>
              <option value='title'>Title</option>
              <option value='status'>Status</option>
            </select>
          </label>
          <button className='btn btn-primary quizzes-add' onClick={handleOpenCreateModal}>
            Add quiz
          </button>
        </div>
        <div className='quizzes-list'>
          {loading && <p>Loading quizzes...</p>}
          {error && <p className='error'>{error}</p>}
          {!loading && !error && quizzes.length === 0 && <div className='quiz-empty-state'><h2>No quizzes yet</h2><p>Create your first quiz to start building assessments.</p><button className='btn btn-primary' onClick={handleOpenCreateModal}>Add quiz</button></div>}
          {!loading && !error && quizzes.length > 0 && filteredQuizzes.length === 0 && <div className='quiz-empty-state'><h2>No matching quizzes</h2><p>Try changing your search or filters.</p></div>}
          {!loading && !error && filteredQuizzes.length > 0 && (
            <div className='quizzes-grid'>
              {filteredQuizzes.map(quiz => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteQuiz}
                  onDuplicate={handleDuplicateQuiz}
                  onPublish={handlePublishQuiz}
                  onArchive={handleArchiveQuiz}
                  onPreview={setPreviewQuiz}
                />
              ))}
            </div>
          )}
        </div>
        {isModalOpen && (
          <QuizModal
            {...modalProps}
          />
        )}
      </section>

      <ConfirmDialog
        isOpen={Boolean(quizToDelete)}
        title='Delete quiz?'
        message={`${quizToDelete?.general?.title ?? 'This quiz'} will be permanently removed.`}
        confirmText='Delete quiz'
        onConfirm={confirmDeleteQuiz}
        onClose={() => setQuizToDelete(null)}
      />

      <Modal isOpen={Boolean(previewQuiz)} onClose={() => setPreviewQuiz(null)}>
        {previewQuiz && (
          <div className='quiz-preview'>
            <p className='eyebrow'>Quiz preview</p>
            <h2>{previewQuiz.general.title || 'Untitled quiz'}</h2>
            <p>{previewQuiz.general.description || 'No description provided.'}</p>
            <div className='quiz-preview__summary'>
              <span>{previewQuiz.content.questionCount || 0} questions</span>
              <span>{previewQuiz.rules.timeLimit || 'No'} min limit</span>
              <span>{previewQuiz.rules.attempts || 'Unlimited'} attempts</span>
            </div>
            <button className='btn btn-secondary' onClick={() => setPreviewQuiz(null)}>Close preview</button>
          </div>
        )}
      </Modal>

    </div>
  )
}

export default Quizzes
