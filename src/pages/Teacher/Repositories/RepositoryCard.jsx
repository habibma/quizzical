import Button from "../../../components/ui/Button";

const Card = ({ ...props }) => {

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
        <Button className={`btn ${isActive ? 'btn-danger' : 'btn-success'}`} text={isActive ? 'Deactivate' : 'Activate'} onClick={onActiveToggle} />
        <Button className="btn-secondary" text="Test connection" onClick={onTestConnection} disabled={health.status === 'checking'} />
        <Button className="btn-primary" text="View categories" onClick={onViewCategories} />
      </div>
    </article>
  )
}

export default Card
