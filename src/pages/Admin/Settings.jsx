// Quiz Settings
// ✅ Default number of questions
// ✅ Shuffle questions
// ✅ Shuffle answers
// ✅ Default difficulty
// ✅ Default question type (Multiple Choice / True-False)
// ✅ Time limit (later)

import { useSettings } from '../../context/SettingsContext'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { defaultSettings } from '../../config/defaultSettings'
import './Settings.css'
import { useEffect, useState } from 'react'

const Settings = () => {

  const { settings, setSettings } = useSettings();
  const [inputs, setInputs] = useState(defaultSettings);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  const handleReset = () => {
    setSettings(defaultSettings);
    setInputs(defaultSettings);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSettings(inputs);
  }

  useEffect(() => {
    setInputs(settings);
  }, [settings]);


  return (
    <div className='settings'>
      <section className='settings-header'>
        <h1>Settings</h1>
        <p className='lead'>Configure the quiz settings below. You can set the number of questions, shuffle questions and answers, choose the difficulty level, and select the question type.</p>
      </section>
      <section className='settings-form'>
        <form onSubmit={handleSubmit} className='form'>
          <Input
            type='number'
            min='1'
            max='50'
            id='numQuestions'
            name='numQuestions'
            value={inputs.numQuestions}
            onChange={handleChange}
            label="Number of Questions"
          />
          {/* <div className='form-group'>
            <label htmlFor='shuffleQuestions'>Shuffle Questions</label>
            <input
              type='checkbox'
              id='shuffleQuestions'
              name='shuffleQuestions'
              checked={inputs.shuffleQuestions}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='shuffleAnswers'>Shuffle Answers</label>
            <input
              type='checkbox'
              id='shuffleAnswers'
              name='shuffleAnswers'
              checked={inputs.shuffleAnswers}
              onChange={handleChange}
            />
          </div> */}
          <Input as='select'
            id='difficulty'
            name='difficulty'
            value={inputs.difficulty}
            onChange={handleChange}
            label="Difficulty"
            options={[
              { value: 'any', label: 'Any Difficulty' },
              { value: 'easy', label: 'Easy' },
              { value: 'medium', label: 'Medium' },
              { value: 'hard', label: 'Hard' },
            ]}
          />
          <Input
            as='select'
            id='questionType'
            name='questionType'
            value={inputs.questionType}
            onChange={handleChange}
            label="Question Type"
            options={[
              { value: 'multiple', label: 'Multiple Choice' },
              { value: 'boolean', label: 'True-False' },
            ]}
          />
          {/* <div className='form-group flex-column'>
            <label htmlFor='timeLimit'>Time Limit (seconds)</label>
            <Input
              type='number'
              min='0'
              id='timeLimit'
              name='timeLimit'
              defaultValue={settings.timeLimit}
              onChange={handleChange}
            />
          </div> */}
          <div className='form-actions'>
            <Button className='form-btn' type='submit' text='Save Settings' />
            <Button className='form-btn' type='button' onClick={handleReset} text='Reset to Defaults' />
          </div>
        </form>
      </section>
    </div>
  )
}

export default Settings