import { useState } from "react";
import { useCategories } from "../../../context/Admin/CategoryContext.jsx";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";

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

  const {
    title,
    description,
    numberOfQuestions,
    numberOfCategories,
    difficulty,
    isActive,
    capabilities,
    onActiveToggle,
    onViewCategories,
  } = props;

  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
        <span className="card-status">{isActive ? "• Active" : "Inactive"}</span>
      </div>
      <div className="card-body">
        <p className="card-description">{description}</p>
        <p>Categories: {numberOfCategories}</p>
        <p>Questions: {numberOfQuestions ? 'Available' : 'None'}</p>
        <p>Difficulty: {difficulty}</p>
        <p>enabled Categories: {capabilities.length}</p>
        <a href="#" onClick={(e) => {
          e.preventDefault();
          onViewCategories();
        }}>
          View Categories
        </a>
      </div>
      <CardActions onActiveToggle={onActiveToggle} isActive={isActive} />
    </div>
  )
}

export default Card
