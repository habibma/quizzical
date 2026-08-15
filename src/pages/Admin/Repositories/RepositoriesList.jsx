import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="checkbox">
      <input className="form-check-input" type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  )
}

const CardActions = ({ onActiveToggle, isActive }) => {
  return (
    <div className="card-actions">
      <Checkbox label="Active" checked={isActive} onChange={onActiveToggle} />
    </div>
  )
}

const Card = ({ ...props }) => {

  const { title,
    description,
    version,
    numberOfQuestions,
    numberOfCategories,
    difficulty,
    isActive,
    link,
    price,
    onActiveToggle,
    capabilities
  } = props;

  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        <p className="card-description">{description}</p>
        <div className="card-rep-content">
          <h4>Available Content:</h4>
          <ul className="card-content-list">
          {capabilities.map((endpoint, index) => (
            <li key={index}>
              <strong>{endpoint.name}:</strong> {endpoint.description}
            </li>
          ))}
          </ul>
        </div>
        <p>Active: {isActive ? "Yes" : "No"}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">
          View repository
        </a>
      </div>
      <CardActions onActiveToggle={onActiveToggle} isActive={isActive} />
    </div>
  )
}

const RepositoriesList = ( { repositories, toggleRepository } ) => {


  return (
    <div className="repositories-list">
      {repositories.map((repo, index) => (
        <Card
          key={index}
          title={repo.title}
          description={repo.description}
          version={repo.version}
          numberOfQuestions={repo.numberOfQuestions}
          numberOfCategories={repo.numberOfCategories}
          difficulty={repo.difficulty}
          isActive={repo.isActive}
          link={repo.link}
          price={repo.price}
          onActiveToggle={() => toggleRepository(repo.id)}
          capabilities={repo.capabilities}
        />
      ))}
    </div>
  )
}

export default RepositoriesList