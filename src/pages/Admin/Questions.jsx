import React from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import VisibleIcon from '../../assets/icons/VisibleIcon'
import InvisibleIcon from '../../assets/icons/InvisibleIcon'

import './Questions.css'

const Questions = () => {

  const categoryOptions = [
    { value: 'any', label: 'Any Category' },
    { value: '9', label: 'General Knowledge' },
  ];

  const difficultyOptions = [
    { value: 'any', label: 'Any Difficulty' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ];

  const typeOptions = [
    { value: 'any', label: 'Any Type' },
    { value: 'multiple', label: 'Multiple Choice' },
    { value: 'boolean', label: 'True-False' },
  ];

  return (
    <div className='questions'>
      <section className='questions-header'>
        <h1>Questions</h1>
        <p className='lead'>Manage your questions here.</p>
      </section>
      <section className='questions-content'>
        <div className='questions-actions'>
          <Input as="select" options={categoryOptions} id="category" name="category" label="Category" />
          <Input as="select" options={difficultyOptions} id="difficulty" name="difficulty" label="Difficulty" />
          <Input as="select" options={typeOptions} id="type" name="type" label="Type" />
        </div>
        <div className='questions-list'>
          <table className='questions-table'>
            <thead>
              <tr>
                <th>Question</th>
                <th>Actions</th>
              </tr>
              <tr>
                <td>
                  <p>Question text will be displayed here.</p>
                </td>
                <td>
                  <VisibleIcon />
                  <InvisibleIcon />
                </td>
              </tr>
            </thead>
            <tbody>
              {/* Question rows will be displayed here */}
            </tbody>
          </table>
        </div>
        <div className='questions-modal'>
          <p>Modal for question details will be displayed here.</p>
        </div>
        <div className='actions-footer'>
          <button className='btn-primary'>Add Question</button>
          <button className='btn-secondary'>Edit Question</button>
          <button className='btn-danger'>Delete Question</button>
        </div>
      </section>
      <section className='questions-footer'>
        <p>Footer content for questions management.</p>
      </section>
    </div >
  )
}

export default Questions

// First version (API-based)
// ✅ Select category
// ✅ Select difficulty
// ✅ Select type
// ✅ Fetch questions from API
// ✅ View question details in a modal
// Future version (your own backend)
// ✅ Add question
// ✅ Edit question
// ✅ Delete question
// ✅ Search questions
// ✅ Filter by category
// ✅ Import/Export questions
// ✅ Bulk actions