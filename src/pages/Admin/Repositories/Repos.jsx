import { useState } from 'react';

import { useRepo } from '../../../context/Admin/ReposContext.jsx';
import { useCategories } from '../../../context/Admin/CategoryContext.jsx';

import Card from './RepositoryCard.jsx';
import CategoryModal from './CategoryModal.jsx';

import './Repos.css';

const RepositoriesList = ( { repositories, toggleRepository, onViewCategories } ) => {

  return (
    <div className="repositories-list">
      {repositories.map((repo, index) => (
        <Card
          key={repo.id}
          title={repo.title}
          description={repo.description}
          numberOfQuestions={repo.numberOfQuestions}
          numberOfCategories={repo.numberOfCategories}
          difficulty={repo.difficulty}
          isActive={repo.isActive}
          capabilities={repo.capabilities}

          onActiveToggle={() => toggleRepository(repo.id)}
          onViewCategories={() => onViewCategories(repo.id)}
        />
      ))}
    </div>
  )
}

const Repositories = () => {

  const { repositories, toggleRepository } = useRepo();
  const { categoriesByRepository, getCategoriesForRepository, toggleCategory } = useCategories();

  const [selectedRepository, setSelectedRepository] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewCategories = async (repoId) => {
    await getCategoriesForRepository(repoId);

    setSelectedRepository(repoId);
    setIsModalOpen(true);
  }

  const selectedCategories = selectedRepository ? categoriesByRepository[selectedRepository] ?? [] : [];

  const handleCloseModal = () => {
    setSelectedRepository(null);
    setIsModalOpen(false);
  }

  return (
    <div className="repositories">
        <section className="repositories-header">
            <h1>Repositories</h1>
            <p className="lead">Add or buy repositories!</p>
        </section>
        <section className="repositories-content">
            {repositories.length > 0 ? (
                <RepositoriesList
                  repositories={repositories}
                  toggleRepository={toggleRepository}
                  onViewCategories={handleViewCategories}
                />
            ) : (
                <p>No repositories available.</p>
            )}
        </section>
        {isModalOpen && (
            <CategoryModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                list={selectedCategories}
                repoId={selectedRepository}
                onToggleCategory={toggleCategory}
            />
        )
        }
    </div>
  )
}

export default Repositories