import React from 'react';
import Button from '../../../components/ui/Button/Button';

const ClassesToolbar = ({
  searchTerm,
  onSearchChange,
  selectedGrade,
  onGradeChange,
  sortBy,
  onSortChange,
  gradeOptions,
  onImport,
  onExport,
}) => {
  return (
    <div className="classes-toolbar">
      <div className="classes-toolbar__controls">
        <input
          className="classes-toolbar__search"
          type="search"
          value={searchTerm}
          placeholder="Search classes"
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search classes"
        />

        <select
          className="classes-toolbar__select"
          value={selectedGrade}
          onChange={(e) => onGradeChange(e.target.value)}
          aria-label="Filter by teacher"
        >
          <option value="all">All teachers</option>
          {gradeOptions.map((teacher) => (
            <option key={teacher} value={teacher}>
              {teacher}
            </option>
          ))}
        </select>

        <select
          className="classes-toolbar__select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort classes"
        >
          <option value="name">Sort by name</option>
          <option value="students">Sort by students</option>
          <option value="newest">Sort by newest</option>
        </select>
      </div>

      <div className="classes-actions">
        <Button className="btn-secondary" text="Import Classes" onClick={onImport} />
        <Button className="btn-secondary" text="Export Classes" onClick={onExport} />
      </div>
    </div>
  );
};

export default ClassesToolbar;
