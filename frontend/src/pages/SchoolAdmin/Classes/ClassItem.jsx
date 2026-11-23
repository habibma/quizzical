import React from 'react';

const ClassItem = ({ classItem, onEdit, onDelete }) => {
  if (!classItem) return null;

  return (
    <article className="class-card">
      <div className="class-card__header">
        <div>
          <p className="class-card__eyebrow">Class</p>
          <h3 className="class-card__title">{classItem.name}</h3>
        </div>

        <span className="class-card__status class-card__status--active">
          {classItem.teacherName || 'Unassigned'}
        </span>
      </div>

      <p className="class-card__description">{classItem.description}</p>

      <div className="class-card__meta">
        <div>
          <span className="class-card__label">Teacher</span>
          <strong>{classItem.teacherName || 'Unassigned'}</strong>
        </div>
        <div>
          <span className="class-card__label">Students</span>
          <strong>{classItem.studentsCount}</strong>
        </div>
      </div>

      <div className="class-card__actions">
        <button
          type="button"
          className="class-card__action class-card__action--edit"
          onClick={() => onEdit && onEdit(classItem)}
        >
          Edit
        </button>
        <button
          type="button"
          className="class-card__action class-card__action--delete"
          onClick={() => onDelete && onDelete(classItem.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default ClassItem;
