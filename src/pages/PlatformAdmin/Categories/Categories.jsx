import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useCategories } from '../../../context/Admin/CategoryContext.jsx'
import { useRepo } from '../../../context/Admin/ReposContext.jsx'
import Button from '../../../components/ui/Button'
import ConfirmDialog from '../../../components/ui/ConfirmDialog/ConfirmDialog'
import CategoriesModal from './CategoriesModal'
import CategorySummary from './CategorySummary'
import CategoryToolbar from './CategoryToolbar'
import CategoryState from './CategoryState'
import Pagination from '../../../components/ui/Pagination/Pagination'

import './Categories.css'

const Categories = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoriesToDisable, setCategoriesToDisable] = useState(null);
  const [selectedRepositoryId, setSelectedRepositoryId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);
  const importInputRef = useRef(null);
  const PAGE_SIZE = 10;

  const {
    categoriesByRepository,
    toggleCategory,
    updateCategoryDetails,
    setCategoriesEnabled,
    importCategories,
    selectRepository,
    loading,
    error,
    getCategoriesForRepository,
  } = useCategories();

  const { activeRepositories } = useRepo();

  const openModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setSelectedCategory(null);
    setIsModalOpen(false);
  }

  const handleSave = (id, details) => {
    updateCategoryDetails(id, details);
    closeModal();
  }

  const handleFilterChange = (e) => {
    const repoId = e.target.value;
    setSelectedRepositoryId(repoId);
    selectRepository(repoId);
    setSearchTerm('');
    setSelectedIds([]);
    setPage(1);
  }

  const categories = categoriesByRepository[selectedRepositoryId] ?? [];
  const filteredCategories = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return categories
      .filter(category => [category.displayName, category.apiName]
        .filter(Boolean)
        .some(name => name.toLowerCase().includes(query)))
      .sort((first, second) => first.displayOrder - second.displayOrder);
  }, [categories, searchTerm]);
  const totalPages = Math.ceil(filteredCategories.length / PAGE_SIZE);
  const visibleCategories = filteredCategories.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const enabledCount = categories.filter(category => category.enabled).length;

  const handleSelection = (ids, checked) => {
    setSelectedIds(currentIds => {
      const nextIds = new Set(currentIds);
      ids.forEach(id => checked ? nextIds.add(id) : nextIds.delete(id));
      return [...nextIds];
    });
  };

  const toggleAll = (enabled) => {
    if (!selectedRepositoryId) return;
    setCategoriesEnabled(selectedRepositoryId, selectedIds, enabled);
    setSelectedIds([]);
  };

  const requestDisableSelected = () => {
    if (selectedIds.length === 0) return;
    setCategoriesToDisable([...selectedIds]);
  };

  const confirmDisableSelected = () => {
    if (!categoriesToDisable) return;
    setCategoriesEnabled(selectedRepositoryId, categoriesToDisable, false);
    setSelectedIds(currentIds => currentIds.filter(id => !categoriesToDisable.includes(id)));
    setCategoriesToDisable(null);
  };

  const clearControls = () => {
    setSearchTerm('');
    setPage(1);
  };

  const exportCategories = () => {
    const data = JSON.stringify(categories, null, 2);
    const url = URL.createObjectURL(new Blob([data], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedRepositoryId || 'categories'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importCategoryFile = (event) => {
    const file = event.target.files?.[0];
    if (!file || !selectedRepositoryId) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result);
        if (!Array.isArray(imported)) throw new Error();
        importCategories(selectedRepositoryId, imported);
        setPage(1);
      } catch {
        window.alert('Unable to import categories. Use a valid JSON array.');
      }
      event.target.value = '';
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) setPage(totalPages);
  }, [page, totalPages]);


  return (
    <div className='categories'>
      <section className='categories-header'>
        <div>
          <p className="categories-eyebrow">Platform Admin</p>
          <h1>Categories</h1>
          <p className='lead'>Manage category visibility and display names for each repository.</p>
        </div>
      </section>
      <section className='categories-table-container'>
        <CategorySummary
          total={categories.length}
          enabled={enabledCount}
          selectedRepository={activeRepositories.find(repo => String(repo.id) === selectedRepositoryId)?.title}
        />
        <CategoryToolbar
          repositories={activeRepositories}
          selectedRepoId={selectedRepositoryId}
          onRepositoryChange={handleFilterChange}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClear={clearControls}
          onEnableAll={() => toggleAll(true)}
          onDisableAll={requestDisableSelected}
          onExport={exportCategories}
          onImport={() => importInputRef.current?.click()}
        />
        <input ref={importInputRef} className="category-import-input" type="file" accept="application/json" onChange={importCategoryFile} />
        {selectedIds.length > 0 && (
          <div className="category-bulk-actions">
            <span>{selectedIds.length} selected</span>
            <Button className="btn-secondary" text="Enable selected" onClick={() => toggleAll(true)} />
            <Button className="btn-secondary" text="Disable selected" onClick={requestDisableSelected} />
          </div>
        )}
        {!selectedRepositoryId ? (
          <CategoryState type="empty" message="Select a repository to view its categories." />
        ) : loading ? (
          <CategoryState type="loading" message="Loading categories..." />
        ) : error ? (
          <CategoryState type="error" message={error} onRetry={() => getCategoriesForRepository(selectedRepositoryId)} />
        ) : (
        <table className='categories-table'>
          <thead className='categories-table-header'>
            <tr>
              <th className="category-select-column">
                <input
                  type="checkbox"
                  aria-label="Select all visible categories"
                  checked={visibleCategories.length > 0 && visibleCategories.every(category => selectedIds.includes(category.id))}
                  onChange={event => handleSelection(visibleCategories.map(category => category.id), event.target.checked)}
                />
              </th>
              <th>Category</th>
              <th>API Name</th>
              <th>Questions</th>
              <th>Enabled</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='categories-table-body'>
            {visibleCategories.length === 0 ? (
              <tr><td colSpan="6"><CategoryState type="empty" message="No categories match your search." /></td></tr>
            ) : visibleCategories.map(category => (
              <tr key={category.id}>
                <td className="category-select-column">
                  <input
                    type="checkbox"
                    aria-label={`Select ${category.displayName}`}
                    checked={selectedIds.includes(category.id)}
                    onChange={event => handleSelection([category.id], event.target.checked)}
                  />
                </td>
                <td>
                  <span className="category-color-swatch" style={{ backgroundColor: category.color }} aria-hidden="true" />
                  <span>{category.icon} {category.displayName}</span>
                </td>
                <td className="category-api-name">{category.apiName}</td>
                <td className="category-question-count">&mdash;</td>
                {/* TODO: Add question count when supported by the repository */}
                <td>
                  <label className="category-toggle">
                    <input
                      type="checkbox"
                      checked={category.enabled}
                      aria-label={`${category.displayName} enabled`}
                      onChange={() => toggleCategory(selectedRepositoryId, category.id)}
                    />
                    <span className="slider"></span>
                    <span>{category.enabled ? 'Enabled' : 'Disabled'}</span>
                  </label>
                </td>
                <td>
                  <Button className="btn btn-primary" text="Edit" onClick={() => openModal(category)} />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className='categories-table-footer'>
            <tr>
              <td colSpan="6">
                <p className="text-muted">Changes are saved automatically. Question counts will appear when supported by the repository.</p>
              </td>
            </tr>
          </tfoot>
        </table>
        )}
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        <CategoriesModal
          isOpen={isModalOpen}
          onClose={closeModal}
          category={selectedCategory}
          onSave={handleSave}
          existingNames={categories.map(category => category.displayName)}
        />
        <ConfirmDialog
          isOpen={Boolean(categoriesToDisable)}
          title="Disable categories?"
          message={`Are you sure you want to disable ${categoriesToDisable?.length || 0} selected ${categoriesToDisable?.length === 1 ? 'category' : 'categories'}?`}
          confirmText="Disable"
          cancelText="Keep enabled"
          onConfirm={confirmDisableSelected}
          onClose={() => setCategoriesToDisable(null)}
        />
      </section>
    </div>
  )
}

export default Categories


// TODO: Add features to the categories page
// Future features
// Choose an icon
// Choose a color
// Set display order
// Number of questions in the category
// Import/Export categories