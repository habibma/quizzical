import React from 'react'
import { useEffect } from 'react'

import { getCategories } from '../../services/triviaService'

import './Categories.css'

const Categories = () => {

  const [categories, setCategories] = React.useState([])

  const toggleCategoryEnabled = (categoryId) => {
    setCategories(prevCategories => prevCategories.map(category => {
      if (category.id === categoryId) {
        return { ...category, enabled: !category.enabled };
      }
      return category;
    }));
  };

  const saveCategoriesToLocalStorage = () => {
    const categoriesToSave = categories.reduce((acc, category) => {
      acc[category.id] = category.enabled;
      return acc;
    }, {});
    localStorage.setItem('categoriesToSave', JSON.stringify(categoriesToSave));
  }

  useEffect(() => {
    // Fetch categories from the API
    getCategories().then(categories => {
      const newCategories = categories.map(category => ({
        id: category.id,
        name: category.name,
        enabled: true
      }));
      setCategories(newCategories);

      // Then load saved preferences from localStorage
      const storedCategories = localStorage.getItem('categoriesToSave');
      if (storedCategories) {
        const stored = JSON.parse(storedCategories);
        setCategories(prevCategories => prevCategories.map(category => ({
          ...category,
          enabled: stored[category.id] !== undefined ? stored[category.id] : category.enabled
        })));
      }
    });
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      saveCategoriesToLocalStorage();
    }
  }, [categories]);

  return (
    <div className='container'>
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
                <td>{category.name}</td>
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
                  <button className="btn btn-primary">Edit</button>
                </td>
            </tr>
            ))}
          </tbody>
          <tfoot className='categories-table-footer'>
            <tr>
              <td colSpan="3">
                <button className="btn btn-success">Save Changes</button>
              </td>
            </tr>
          </tfoot>
        </table>
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
// Import/Export categories