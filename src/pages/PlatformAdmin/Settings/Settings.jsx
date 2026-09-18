import { useEffect, useState } from 'react'
import { useSettings } from '../../../context/Admin/SettingsContext'

import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'

import { defaultSettings } from '../../../config/defaultSettings'

import './Settings.css'

const Settings = () => {

  const { settings, setSettings } = useSettings();
  const [inputs, setInputs] = useState(settings);
  const [isSaved, setIsSaved] = useState(false);

  const isDirty = JSON.stringify(inputs) !== JSON.stringify(settings);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setIsSaved(false);
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    }));
  }

  const handleReset = () => {
    if (!window.confirm('Reset all quiz defaults to their original values?')) return;
    setSettings(defaultSettings);
    setInputs({ ...defaultSettings });
    setIsSaved(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSettings(inputs);
    setIsSaved(true);
  }

  useEffect(() => {
    setInputs(settings);
  }, [settings]);


  return (
    <div className='settings'>
      <section className='settings-header'>
        <div>
          <p className='eyebrow'>Platform defaults</p>
          <h1>Quiz Defaults</h1>
          <p className='lead'>Set the starting rules used when learners create a custom quiz. They can still adjust these choices before starting.</p>
        </div>
      </section>
      <section className='settings-grid'>
        <form onSubmit={handleSubmit} className='settings-form'>
          <div className='settings-section'>
            <div className='section-heading'>
              <h2>Quiz rules</h2>
              <p>Choose the starting difficulty and format.</p>
            </div>
            <div className='form-fields'>
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
                  { value: 'any', label: 'Any Type' },
                  { value: 'multiple', label: 'Multiple Choice' },
                  { value: 'boolean', label: 'True-False' },
                ]}
              />
            </div>
          </div>
          <div className='form-actions'>
            <Button className='reset-btn' type='button' onClick={handleReset} text='Reset to Defaults' />
            <Button className='form-btn' type='submit' disabled={!isDirty} text={isSaved ? 'Saved' : 'Save Changes'} />
          </div>
        </form>
        <aside className='settings-summary' aria-label='Current quiz defaults'>
          <p className='eyebrow'>Current setup</p>
          <h2>Ready to play</h2>
          <p className='summary-copy'>New custom quizzes will start with these choices.</p>
          <dl>
            <div><dt>Questions</dt><dd>{inputs.numQuestions}</dd></div>
            <div><dt>Difficulty</dt><dd>{inputs.difficulty === 'any' ? 'Any' : inputs.difficulty}</dd></div>
            <div><dt>Format</dt><dd>{inputs.questionType === 'any' ? 'Any type' : inputs.questionType === 'boolean' ? 'True-False' : 'Multiple choice'}</dd></div>
          </dl>
          {isSaved && <p className='saved-message' role='status'>Defaults saved successfully.</p>}
        </aside>
      </section>
    </div>
  )
}

export default Settings