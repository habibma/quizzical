import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

const listOfRepositories = [
  {
    title: "Repository 1",
    description: "This is the first repository.",
    version: "1.0.0",
    numberOfQuestions: 10,
    numberOfCategories: 5,
    difficulty: ["Easy", "Medium", "Hard"],
    isActive: true,
    link: "https://github.com/user/repo1",
    price: 0
  },
  {
    title: "Repository 2",
    description: "This is the second repository.",
    version: "1.0.0",
    numberOfQuestions: 15,
    numberOfCategories: 7,
    difficulty: ["Easy", "Medium"],
    isActive: false,
    link: "https://github.com/user/repo2",
    price: 9.99
  }
];

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="checkbox">
      <input className="form-check-input" type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  )
}

const CardActions = ({ onDelete, onActiveToggle, isActive }) => {
  return (
    <div className="card-actions">
      <Checkbox label="Active" checked={isActive} onChange={onActiveToggle} />
      <Button className="btn-danger" text="Delete" onClick={onDelete} />
    </div>
  )
}

const Card = ({ ...props }) => {

  const { title, description, version, numberOfQuestions, numberOfCategories, difficulty, isActive, link, price, onDelete, onActiveToggle } = props;

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
        <p>Price: {isActive ? "Free" : `$${price.toFixed(2)}`}</p>
      </div>
      <CardActions onDelete={onDelete} onActiveToggle={onActiveToggle} isActive={isActive} />
    </div>
  )
}

const RepositoriesList = () => {

  const [repositories, setRepositories] = useState(listOfRepositories);

  const handleActiveToggle = (index) => {
    const updatedRepositories = [...repositories];
    updatedRepositories[index].isActive = !updatedRepositories[index].isActive;
    setRepositories(updatedRepositories);
  }

  const handleDelete = (index) => {
    const updatedRepositories = repositories.filter((_, i) => i !== index);
    setRepositories(updatedRepositories);
  }

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
          onDelete={() => handleDelete(index)}
          isActive={repo.isActive}
          onActiveToggle={() => handleActiveToggle(index)}
        />
      ))}
    </div>
  )
}

export default RepositoriesList