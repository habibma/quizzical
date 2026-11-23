import React from 'react';

const ClassesSummaryCard = ({ label, value }) => {
  return (
    <div className="classes-summary-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
};

export default ClassesSummaryCard;
