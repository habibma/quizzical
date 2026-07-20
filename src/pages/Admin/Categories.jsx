import React from 'react'
import { useEffect } from 'react'
import { useCategories } from '../../context/CategoryContext.jsx'
import Modal from '../../components/Modal.jsx'
import Button from '../../components/Button.jsx'
import Input from '../../components/Input.jsx'

import './Categories.css'

const Categories = () => {

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [editedName, setEditedName] = React.useState('');

  const { categories, setCategories } = useCategories();

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

  const handleSave = () => {
    if (!selectedCategory) {
      return;
    }

    const newName = editedName.trim();
    if (!newName) {
      return;
    }

    setCategories(prevCategories => {
      const updated = prevCategories.map(category => {
        if (category.id === selectedCategory.id) {
          return { ...category, displayName: newName };
        }
        return category;
      });
      return updated;
    });
    closeModal();
  };

  // Save to localStorage whenever categories change
  useEffect(() => {
    if (categories.length > 0) {
      const categoriesToSave = categories.reduce((acc, category) => {
        acc[category.id] = category.enabled;
        return acc;
      }, {});
      localStorage.setItem('categoriesToSave', JSON.stringify(categoriesToSave));
    }
  }, [categories]);

  const toggleCategoryEnabled = (categoryId) => {
    setCategories(prevCategories => {
      const updated = prevCategories.map(category => {
        if (category.id === categoryId) {
          return { ...category, enabled: !category.enabled };
        }
        return category;
      });
      return updated;
    });
  };

  const modalContent = selectedCategory && (
    <div className='modal-body'>
      <header className='modal-header'>
        <h2>Edit Category</h2>
        <p>Editing category: {selectedCategory.apiName}</p>
      </header>
      <form
        className='modal-form'
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}>
        <Input
          className='modal-input'
          type="text"
          id="categoryName"
          name="categoryName"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          required
        />
        <div className='modal-actions'>
          <Button className="btn-primary" type="submit" text="Save" />
          <Button className="btn-secondary" type="button" text="Cancel" onClick={closeModal} />
        </div>
      </form>
    </div>
  );

  return (
    <div className='categories'>
      <section className='categories-header'>
        <h1>Categories</h1>
        <p className='lead'>View all categories gotten from the api, You can enable or disable a category by toggling the switch next to the category name. You can edit a category name by clicking on the edit button next to the category name.</p>
      </section>
      <section className='categories-table-container'>
        <table className='categories-table'>
          <thead className='categories-table-header'>
            <tr>
              <th>Category Name</th>
              <th>Enabled</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='categories-table-body'>
            {categories.map(category => (
              <tr key={category.id}>
                <td>{category.displayName}</td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={category.enabled}
                      onChange={() => toggleCategoryEnabled(category.id)}
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
        <Modal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave}>
          {modalContent}
        </Modal>
      </section>
    </div>
  )
}

export default Categories


// View all categories gotten from the api
// enable or disable a category
// Edit a category name
// Future features
// Choose an icon
// Choose a color
// Set display order
// Number of questions in the category
// Import/Export categ