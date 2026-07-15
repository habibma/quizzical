import React from 'react'
import { useEffect } from 'react'
import { useCategories } from '../../context/CategoryContext.jsx'

import './Categories.css'

const Categories = () => {

  const { categories, setCategories } = useCategories();

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
                <p className="text-muted">Changes are saved automatically</p>
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