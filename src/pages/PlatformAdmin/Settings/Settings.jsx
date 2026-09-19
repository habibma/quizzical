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
          <p className='eyebrow'>Platform administration</p>
          <h1>Settings</h1>
          <p className='lead'>Manage defaults and policies that apply across the platform.</p>
        </div>
      </section>
      <div className='settings-sections'>
        <section className='settings-panel settings-panel--active'>
          <div className='panel-heading'>
            <div>
              <p className='eyebrow'>Active configuration</p>
              <h2>Quiz Defaults</h2>
              <p>Set the starting rules used when learners create a custom quiz.</p>
            </div>
            <span className='panel-status'>Available</span>
          </div>
          <div className='settings-grid'>
            <form onSubmit={handleSubmit} className='settings-form'>
              <div className='settings-section'>
                <div className='section-heading'>
                  <h3>Default quiz rules</h3>
                  <p>Learners can adjust these choices before starting.</p>
                </div>
                <div className='form-fields'>
                  <Input type='number' min='1' max='50' id='numQuestions' name='numQuestions' value={inputs.numQuestions} onChange={handleChange} label='Default question count' />
                  <Input as='select' id='difficulty' name='difficulty' value={inputs.difficulty} onChange={handleChange} label='Default difficulty' options={[{ value: 'any', label: 'Any Difficulty' }, { value: 'easy', label: 'Easy' }, { value: 'medium', label: 'Medium' }, { value: 'hard', label: 'Hard' }]} />
                  <Input as='select' id='questionType' name='questionType' value={inputs.questionType} onChange={handleChange} label='Default question type' options={[{ value: 'any', label: 'Any Type' }, { value: 'multiple', label: 'Multiple Choice' }, { value: 'boolean', label: 'True-False' }]} />
                </div>
              </div>
              <div className='form-actions'>
                <Button className='form-btn' type='submit' disabled={!isDirty} text={isSaved ? 'Saved' : 'Save Changes'} />
              </div>
            </form>
            <aside className='settings-summary' aria-label='Current quiz defaults'>
              <p className='eyebrow'>Current setup</p>
              <h3>Ready to play</h3>
              <p className='summary-copy'>New custom quizzes will start with these choices.</p>
              <dl>
                <div><dt>Questions</dt><dd>{inputs.numQuestions}</dd></div>
                <div><dt>Difficulty</dt><dd>{inputs.difficulty === 'any' ? 'Any' : inputs.difficulty}</dd></div>
                <div><dt>Format</dt><dd>{inputs.questionType === 'any' ? 'Any type' : inputs.questionType === 'boolean' ? 'True-False' : 'Multiple choice'}</dd></div>
              </dl>
              {isSaved && <p className='saved-message' role='status'>Defaults saved successfully.</p>}
            </aside>
          </div>
        </section>

        <section className='settings-panel'>
          <div className='panel-heading'>
            <div><h2>Platform Policies</h2><p>Control shared quiz limits, question sources, and feature availability.</p></div>
            <span className='panel-status panel-status--planned'>Planned</span>
          </div>
          <ul className='planned-settings'><li>Maximum quiz length</li><li>Available question sources</li><li>Global feature flags</li></ul>
        </section>

        <section className='settings-panel'>
          <div className='panel-heading'>
            <div><h2>Appearance</h2><p>Define the platform identity and default visual experience.</p></div>
            <span className='panel-status panel-status--planned'>Planned</span>
          </div>
          <ul className='planned-settings'><li>Default theme</li><li>Platform name and logo</li><li>Global branding</li></ul>
        </section>

        <section className='settings-panel'>
          <div className='panel-heading'>
            <div><h2>Integrations</h2><p>Manage connections to external services from one place.</p></div>
            <span className='panel-status panel-status--planned'>Planned</span>
          </div>
          <ul className='planned-settings'><li>API credentials</li><li>External services</li></ul>
        </section>

        <section className='settings-panel'>
          <div className='panel-heading'>
            <div><h2>System</h2><p>Configure operational behavior and platform data management.</p></div>
            <span className='panel-status panel-status--planned'>Planned</span>
          </div>
          <ul className='planned-settings'><li>Maintenance mode</li><li>Data and storage settings</li></ul>
        </section>
      </div>
    </div>
  )
}

export default Settings