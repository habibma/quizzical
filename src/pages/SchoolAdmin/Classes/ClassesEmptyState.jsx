import React from 'react';

const ClassesEmptyState = ({ title, message, variant = 'default' }) => {
  return (
    <div className={`classes-empty ${variant === 'error' ? 'classes-empty--error' : ''} ${variant === 'loading' ? 'classes-empty--loading' : ''}`}>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
};

export default ClassesEmptyState;
