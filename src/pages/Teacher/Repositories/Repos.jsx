import { useMemo, useState } from 'react';

import { useRepo } from '../../../context/Admin/ReposContext.jsx';
import { useCategories } from '../../../context/Admin/CategoryContext.jsx';

import Card from './RepositoryCard.jsx';
import CategoryModal from './CategoryModal.jsx';

import './Repos.css';

const RepositoriesList = ({ repositories, toggleRepository, onViewCategories, numberOfCategories, healthByRepository, onTestConnection }) => {

  return (
    <div className="repositories-list">
      {repositories.map((repo, index) => (
        <Card
          key={repo.id}
          title={repo.title}
          description={repo.description}
          numberOfQuestions={repo.numberOfQuestions}
          numberOfCategories={numberOfCategories(repo.id)}
          difficulty={repo.difficulty}
          isActive={repo.isActive}
          capabilities={repo.capabilities}
          health={healthByRepository[repo.id] ?? { status: 'unknown', message: 'Not checked yet.' }}

          onActiveToggle={() => toggleRepository(repo.id)}
          onViewCategories={() => onViewCategories(repo.id)}
          onTestConnection={() => onTestConnection(repo)}
        />
      ))}
    </div>
  )
}

const Repositories = () => {

  const { repositories, toggleRepository, healthByRepository, testRepository } = useRepo();
  const { categoriesByRepository, getCategoriesForRepository, toggleCategory, loading, error } = useCategories();

  const [selectedRepository, setSelectedRepository] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredRepositories = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return repositories.filter(repo => {
      const matchesSearch = !query || [repo.title, repo.description, repo.adaptor]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(query);
      const matchesStatus = statusFilter === 'all'
        || (statusFilter === 'active' && repo.isActive)
        || (statusFilter === 'inactive' && !repo.isActive);
      return matchesSearch && matchesStatus;
    });
  }, [repositories, searchTerm, statusFilter]);

  const handleViewCategories = async (repoId) => {
    await getCategoriesForRepository(repoId);

    setSelectedRepository(repoId);
    setIsModalOpen(true);
  }

  const activeCategories = selectedRepository ? categoriesByRepository[selectedRepository] ?? [] : [];

  const handleCloseModal = () => {
    setSelectedRepository(null);
    setIsModalOpen(false);
  }

  const numberOfCategories = (repoId) => {
    const categories = categoriesByRepository[repoId] ?? [];
    return {
      total: categories.length,
      enabled: categories.filter(category => category.enabled).length,
    };
  };

  return (
    <div className="repositories">
        <section className="repositories-header">
            <h1>Repositories</h1>
          <p className="lead">Manage connected question repositories and choose which sources are available to teachers.</p>
        </section>
        <section className="repositories-content">
            <div className="repositories-toolbar">
              <div className="repository-search">
                <label htmlFor="repository-search">Search repositories</label>
                <input id="repository-search" type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search by name or adaptor" />
              </div>
              <div className="repository-filter">
                <label htmlFor="repository-status">Status</label>
                <select id="repository-status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                  <option value="all">All repositories</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            {repositories.length === 0 ? (
                <p className="repository-state">No repositories configured. Add an API source to make it available here.</p>
            ) : filteredRepositories.length === 0 ? (
                <p className="repository-state">No repositories match your search or filter.</p>
            ) : (
                <RepositoriesList
                  repositories={filteredRepositories}
                  toggleRepository={toggleRepository}
                  onViewCategories={handleViewCategories}
                  numberOfCategories={numberOfCategories}
                  healthByRepository={healthByRepository}
                  onTestConnection={testRepository}
                />
            )}
        </section>
        {isModalOpen && (
            <CategoryModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                list={activeCategories}
                repoId={selectedRepository}
                onToggleCategory={toggleCategory}
                loading={loading}
                error={error}
                onRetry={() => getCategoriesForRepository(selectedRepository)}
            />
        )
        }
    </div>
  )
}

export default Repositories