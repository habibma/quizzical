import { useState } from "react";
import Button from "../../../components/ui/Button/Button";
import ConfirmDialog from "../../../components/ui/ConfirmDialog/ConfirmDialog";

const Card = ({ ...props }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const {
    title,
    description,
    numberOfQuestions,
    numberOfCategories,
    difficulty,
    isActive,
    capabilities,
    health,
    onTestConnection,
    onActiveToggle,
    onViewCategories,
  } = props;

  const handleAvailabilityChange = () => {
    if (isActive) {
      setIsConfirmOpen(true);
      return;
    }

    onActiveToggle();
  };

  const confirmDeactivation = () => {
    onActiveToggle();
    setIsConfirmOpen(false);
  };

  return (
    <article className="repository-card">
      <div className="repository-card__header">
        <h3>{title}</h3>
        <span className={`repository-status repository-status--${isActive ? 'active' : 'inactive'}`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
      <div className="repository-card__body">
        <p className="repository-card__description">{description}</p>
        <div className="repository-card__metrics">
          <span>Categories <strong>{numberOfCategories.enabled} / {numberOfCategories.total}</strong></span>
          <span>Questions <strong>{numberOfQuestions ? 'Available' : 'None'}</strong></span>
          <span>Difficulty <strong>{difficulty || 'Mixed'}</strong></span>
        </div>
        <p className="repository-card__capabilities">Capabilities: {capabilities?.length || 0}</p>
        <div className="repository-health">
          <span className={`health-dot health-dot--${health.status}`} aria-hidden="true" />
          <span>{health.message}</span>
        </div>
      </div>
      <div className="repository-card__actions">
        <label className="repository-availability">
          <span>Available to teachers</span>
          <input
            type="checkbox"
            checked={isActive}
            onChange={handleAvailabilityChange}
            aria-label={`${isActive ? 'Deactivate' : 'Activate'} ${title}`}
          />
          <span className="repository-switch" aria-hidden="true" />
        </label>
        <Button className="btn-secondary" text="Test connection" onClick={onTestConnection} disabled={health.status === 'checking'} />
        <Button className="btn-primary" text="View categories" onClick={onViewCategories} />
      </div>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Deactivate repository?"
        message={`${title} will no longer be available to teachers when they create new quizzes.`}
        confirmText="Deactivate"
        onConfirm={confirmDeactivation}
        onClose={() => setIsConfirmOpen(false)}
      />
    </article>
  )
}

export default Card
