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
  } = props;

  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        <p className="card-description">{description}</p>
        <p>Version: {version}</p>
        <p>Number of Questions: {numberOfQuestions}</p>
        <p>Number of Categories: {numberOfCategories}</p>
        <p>Difficulty: {difficulty.join(", ")}</p>
        <p>Active: {isActive ? "Yes" : "No"}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">
          View repository
        </a>
        <p>Price: {price === 0 ? "Free" : `$${price.toFixed(2)}`}</p>
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
        />
      ))}
    </div>
  )
}

export default RepositoriesList