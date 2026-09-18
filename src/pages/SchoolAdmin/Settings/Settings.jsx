import { useEffect, useState } from 'react'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'

import './Settings.css'

const defaultSchoolSettings = {
  schoolName: '',
  contactEmail: '',
  maxQuestions: 50,
  defaultTimeLimit: 0,
  allowAnyDifficulty: true,
  primaryColor: '#4D5B9E',
}

const Settings = () => {
  const [settings, setSettings] = useState(() => {
    try {
      const savedSettings = localStorage.getItem('schoolSettings')
      return savedSettings ? { ...defaultSchoolSettings, ...JSON.parse(savedSettings) } : defaultSchoolSettings
    } catch {
      return defaultSchoolSettings
    }
  })
  const [isSaved, setIsSaved] = useState(false)
  const [savedSettings, setSavedSettings] = useState(settings)

  const isDirty = JSON.stringify(settings) !== JSON.stringify(savedSettings)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setIsSaved(false)
    setSettings(previous => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    localStorage.setItem('schoolSettings', JSON.stringify(settings))
    setSavedSettings(settings)
    setIsSaved(true)
  }

  const handleReset = () => {
    if (!window.confirm('Reset school settings to their default values?')) return
    setSettings({ ...defaultSchoolSettings })
    localStorage.removeItem('schoolSettings')
    setSavedSettings({ ...defaultSchoolSettings })
    setIsSaved(true)
  }

  useEffect(() => {
    document.title = 'School Settings'
    return () => {
      document.title = 'Quizzical'
    }
  }, [])

  return (
    <div className="school-settings">
      <header className="school-settings-header">
        <p className="eyebrow">School administration</p>
        <h1>School Settings</h1>
        <p>Manage the policies and identity that apply to this school.</p>
      </header>

      <form className="school-settings-form" onSubmit={handleSubmit}>
        <section className="school-settings-section">
          <div className="section-heading">
            <h2>School profile</h2>
            <p>Keep the school details used across administrative views.</p>
          </div>
          <div className="school-fields">
            <Input
              id="schoolName"
              name="schoolName"
              label="School name"
              value={settings.schoolName}
              onChange={handleChange}
              placeholder="Example Academy"
            />
            <Input
              id="contactEmail"
              name="contactEmail"
              type="email"
              label="Contact email"
              value={settings.contactEmail}
              onChange={handleChange}
              placeholder="admin@example.edu"
            />
          </div>
        </section>

        <section className="school-settings-section">
          <div className="section-heading">
            <h2>Quiz policies</h2>
            <p>Set reasonable limits for quizzes created by teachers.</p>
          </div>
          <div className="school-fields">
            <Input
              id="maxQuestions"
              name="maxQuestions"
              type="number"
              min="1"
              max="100"
              label="Maximum questions per quiz"
              value={settings.maxQuestions}
              onChange={handleChange}
            />
            <Input
              id="defaultTimeLimit"
              name="defaultTimeLimit"
              type="number"
              min="0"
              max="240"
              label="Default time limit (minutes)"
              value={settings.defaultTimeLimit}
              onChange={handleChange}
            />
          </div>
          <label className="school-toggle" htmlFor="allowAnyDifficulty">
            <input
              id="allowAnyDifficulty"
              name="allowAnyDifficulty"
              type="checkbox"
              checked={settings.allowAnyDifficulty}
              onChange={handleChange}
            />
            <span>
              <strong>Allow any difficulty</strong>
              <small>Teachers can choose any difficulty when creating a quiz.</small>
            </span>
          </label>
        </section>

        <section className="school-settings-section">
          <div className="section-heading">
            <h2>School branding</h2>
            <p>Choose the accent color used for school-level surfaces.</p>
          </div>
          <label className="color-field" htmlFor="primaryColor">
            <span>Primary color</span>
            <input id="primaryColor" name="primaryColor" type="color" value={settings.primaryColor} onChange={handleChange} />
          </label>
        </section>

        <div className="school-settings-actions">
          <Button className="school-reset-button" type="button" onClick={handleReset} text="Reset defaults" />
          <Button className="school-save-button" type="submit" disabled={!isDirty} text={isSaved ? 'Saved' : 'Save changes'} />
        </div>
        {isSaved && <p className="school-saved-message" role="status">School settings saved successfully.</p>}
      </form>
    </div>
  )
}

export default Settings