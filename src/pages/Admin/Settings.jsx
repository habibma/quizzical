// Quiz Settings
// ✅ Default number of questions
// ✅ Shuffle questions
// ✅ Shuffle answers
// ✅ Default difficulty
// ✅ Default question type (Multiple Choice / True-False)
// ✅ Time limit (later)

import { useState, useEffect } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { defaultSettings } from '../../config/defaultSettings'
import './Settings.css'

const Settings = () => {

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('quizSettings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return null;
  };

  const [settings, setSettings] = useState(() => loadSettings() || defaultSettings);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    localStorage.setItem('quizSettings', JSON.stringify(settings));
  }, [settings]);

  return (
    <div className='settings'>
      <section className='settings-header'>
        <h1>Settings</h1>
        <p className='lead'>Configure the quiz settings below. You can set the number of questions, shuffle questions and answers, choose the difficulty level, and select the question type.</p>
      </section>
      <section className='settings-form'>
        <form>
          <div className='form-group flex-column'>
            <label htmlFor='numQuestions'>Number of Questions</label>
            <Input
              type='number'
              id='numQuestions'
              name='numQuestions'
              defaultValue='5'
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='shuffleQuestions'>Shuffle Questions</label>
            <input
              type='checkbox'
              id='shuffleQuestions'
              name='shuffleQuestions'
              checked={settings.shuffleQuestions}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='shuffleAnswers'>Shuffle Answers</label>
            <input
              type='checkbox'
              id='shuffleAnswers'
              name='shuffleAnswers'
              checked={settings.shuffleAnswers}
              onChange={handleChange}
            />
          </div>
          <div className='form-group flex-column'>
            <label htmlFor='difficulty'>Difficulty</label>
            <select
              id='difficulty'
              name='difficulty'
              value={settings.difficulty}
              onChange={handleChange}
            >
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select>
          </div>
          <div className='form-group flex-column'>
            <label htmlFor='questionType'>Question Type</label>
            <select
              id='questionType'
              name='questionType'
              value={settings.questionType}
              onChange={handleChange}
            >
              <option value='multiple'>Multiple Choice</option>
              <option value='boolean'>True-False</option>
            </select>
          </div>
          <Button className='form-btn' type='submit' onClick={handleSubmit} text='Save Settings' />
        </form>
      </section>
    </div>
  )
}

export default Settings