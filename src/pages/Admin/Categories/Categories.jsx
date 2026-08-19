import React from 'react'
import { useState ,useEffect } from 'react'
import { useCategories } from '../../../context/Admin/CategoryContext.jsx'
import { useRepo } from '../../../context/Admin/ReposContext.jsx'
import Modal from '../../../components/Modal'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import CategoriesFilters from './CategoriesFilters'
import CategoriesModal from './CategoriesModal'

import './Categories.css'

const Categories = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editedName, setEditedName] = useState('');

  const { categoriesByRepository, toggleCategory, updateCategoryName, selectedRepoId, selectRepository } = useCategories();

  const { activeRepositories } = useRepo();

  const openModal = (category) => {
    setSelectedCategory(category);
    setEditedName(category.displayName);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setSelectedCategory(null);
    setEditedName('');
    setIsModalOpen(false);
  }

  const handleSave = (id, newName) => {
    updateCategoryName(id, newName);
    closeModal();
  }

  const handleFilterChange = (e) => {
    const repoId = e.target.value;
    selectRepository(repoId);
  }


  return (
    <div className='categories'>
      <section className='categories-header'>
        <h1>Categories</h1>
        <p className='lead'>View all categories gotten from the api, You can enable or disable a category by toggling the switch next to the category name. You can edit a category name by clicking on the edit button next to the category name.</p>
      </section>
      <section className='categories-table-container'>
        <CategoriesFilters
          repositories={activeRepositories}
          selectedRepoId={selectedRepoId}
          onFilterChange={handleFilterChange}
        />
        <table className='categories-table'>
          <thead className='categories-table-header'>
            <tr>
              <th>Category Name</th>
              <th>Enabled</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='categories-table-body'>
            {categoriesByRepository[selectedRepoId]?.map(category => (
              <tr key={category.id}>
                <td>{category.displayName}</td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={category.enabled}
                      onChange={() => toggleCategory(selectedRepoId, category.id)}
                    />
                    <span className="slider"></span>
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
              <td colSpan="3">
                <p className="text-muted">Changes are saved automatically</p>
              </td>
            </tr>
          </tfoot>
        </table>
        <CategoriesModal
          isOpen={isModalOpen}
          onClose={closeModal}
          category={selectedCategory}
          onSave={handleSave}
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