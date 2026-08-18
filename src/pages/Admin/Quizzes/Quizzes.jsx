import { useState } from 'react'
import { useQuiz } from '../../../context/Admin/QuizContext'

import QuizCard from './QuizCard'
import QuizModal from './QuizModal'

import './Quizzes.css'


const createEmptyQuiz = () => ({
  general: {
    title: '',
    description: '',
  },
  content: {
    repositories: [],
    categories: [],
    questionCount: 0,
    questionSelection: 'random',
  },
  rules: {
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

  const { quizzes, loading, error, addQuiz, updateQuiz, deleteQuiz } = useQuiz();


  // input change handler for the modal form
 const handleInputChange = (section, e) => {
  const { name, value } = e.target;

  setInputValues(prev => ({
    ...prev,
    [section]: {
      ...prev[section],
      [name]: value,
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
        access: {
          ...(quizToDuplicate.access),
          status: "draft"
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
        updatedAt: new Date().toDateString(),
      };
      updateQuiz(updatedQuizData);
    }
  };

  // functions to handle modal open/close and save
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuiz(null);
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

    handleCloseModal();
  };

  const handleOpenEditModal = (quiz) => {
    setEditingQuiz(quiz);
    setIsModalOpen(true);
  }

  const handleOpenCreateModal = () => {
    setEditingQuiz(null);
    setIsModalOpen(true);
  }

  const modalProps = {
    isOpen: isModalOpen,
    onClose: handleCloseModal,
    quiz: editingQuiz,
    onSave: handleSaveQuiz,
    isEditing: !!editingQuiz,
    inputValues: inputValues,
    onInputChange: handleInputChange
  };

  return (
    <div className='quizzes'>
      <section className='quizzes-header'>
        <h1>Quizzes</h1>
        <p className='lead'>Manage your quizzes here.</p>
      </section>
      <section className='quizzes-content'>
        <div className='quizzes-add'>
          <button className='btn btn-primary' onClick={handleOpenCreateModal}>
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
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteQuiz}
                  onDuplicate={handleDuplicateQuiz}
                  onPublish={handlePublishQuiz}
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

    </div>
  )
}

export default Quizzes
