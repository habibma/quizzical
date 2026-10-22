import React, { useMemo, useState } from 'react';
import Button from '../../../components/ui/Button/Button';
import { useClasses } from '../../../context/SchoolAdmin/ClassesContext';
import ClassItem from './ClassItem';
import ClassModal from './ClassModal';
import ClassesSummaryCard from './ClassesSummaryCard';
import ClassesToolbar from './ClassesToolbar';
import ClassesEmptyState from './ClassesEmptyState';

import './Classes.css';

const normalizeClassItem = (item) => {
  const value = item || {};

  return {
    id: value.id ?? value.class_id ?? value._id ?? 0,
    name: value.name ?? value.class_name ?? value.className ?? `Class ${value.id ?? 'Unknown'}`,
    description: value.description ?? '',
    teachers: Array.isArray(value.teachers) ? value.teachers : [],
    teacherId: value.teacher_id ?? value.teacherId ?? value.teachers?.[0]?.id ?? null,
    teacherName: value.teacher_name ?? value.teacherName ?? value.teachers?.map((teacher) => teacher.name).filter(Boolean).join(', ') ?? 'Unassigned',
    studentsCount: Number(value.students_count ?? value.student_count ?? value.studentCount ?? value.total_students ?? 0),
  };
};

const Classes = () => {
  const {
    classes: rawClasses,
    loading,
    error: classesError,
    addClass,
    updateClassItem,
    removeClass,
  } = useClasses();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const normalizedClasses = useMemo(
    () => rawClasses.map((item) => normalizeClassItem(item)),
    [rawClasses]
  );

  const teacherOptions = useMemo(() => {
    return [...new Set(normalizedClasses.map((item) => item.teacherName).filter(Boolean))];
  }, [normalizedClasses]);

  const visibleClasses = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const filtered = normalizedClasses.filter((item) => {
      const matchesSearch = !query || [
        item.name,
        item.teacherName,
        item.description,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));

      const matchesTeacher = selectedTeacher === 'all' || item.teacherName === selectedTeacher;

      return matchesSearch && matchesTeacher;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'students') {
        return b.studentsCount - a.studentsCount || a.name.localeCompare(b.name);
      }

      if (sortBy === 'newest') {
        return Number(b.id) - Number(a.id);
      }

      return a.name.localeCompare(b.name);
    });
  }, [normalizedClasses, searchTerm, selectedTeacher, sortBy]);

  const stats = useMemo(() => ({
    total: normalizedClasses.length,
    assigned: normalizedClasses.filter((item) => item.teachers.length > 0 || (item.teacherId !== null && item.teacherId !== undefined)).length,
    students: normalizedClasses.reduce((sum, item) => sum + item.studentsCount, 0),
  }), [normalizedClasses]);

  const handleOpenModal = (classItem = null) => {
    setSelectedClass(classItem);
    setSaveError('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedClass(null);
    setSaveError('');
  };

  const handleSaveClass = async (payload) => {
    setSaving(true);
    setSaveError('');
    try {
      if (selectedClass) {
        await updateClassItem(payload);
      } else {
        await addClass(payload);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save class:', error);
      setSaveError(error.message || 'Unable to save this class.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClass = async (classId) => {
    try {
      await removeClass(classId);
    } catch (error) {
      console.error('Failed to delete class:', error);
    }
  };

  const handleImportClasses = () => {
    console.log('Import Classes button clicked');
  };

  const handleExportClasses = () => {
    console.log('Export Classes button clicked');
  };

  if (loading) {
    return (
      <div className="classes-container">
        <ClassesEmptyState
          title="Loading classes..."
          message="Fetching school classes from the database."
          variant="loading"
        />
      </div>
    );
  }

  return (
    <div className="classes-container">
      <section className="classes-header">
        <div className="classes-header__content">
          <p className="classes-header__eyebrow">School Admin</p>
          <h1 className="classes-header--title">Classes</h1>
          <p className="classes-header--description">
            Manage school sections, grade levels, and class assignments.
          </p>
        </div>

        <div className="classes-header__actions">
          <Button
            className="btn-primary classes-actions--add"
            text="Add Class"
            onClick={() => handleOpenModal()}
          />
        </div>
      </section>

      <section className="classes-summary-grid">
        <ClassesSummaryCard label="Total Classes" value={stats.total} />
        <ClassesSummaryCard label="Assigned Teachers" value={stats.assigned} />
        <ClassesSummaryCard label="Students" value={stats.students} />
        <ClassesSummaryCard label="Teachers" value={new Set(normalizedClasses.map((item) => item.teacherName).filter(Boolean)).size} />
      </section>

      <section className="classes-content">
        <ClassesToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedGrade={selectedTeacher}
          onGradeChange={setSelectedTeacher}
          sortBy={sortBy}
          onSortChange={setSortBy}
          gradeOptions={teacherOptions}
          onImport={handleImportClasses}
          onExport={handleExportClasses}
        />

        <div className="classes-list-header">
          <h2>Class List</h2>
          <span>{visibleClasses.length} classes</span>
        </div>

        {classesError ? (
          <ClassesEmptyState
            title="Unable to fetch classes"
            message={classesError}
            variant="error"
          />
        ) : visibleClasses.length > 0 ? (
          <div className="classes-list">
            {visibleClasses.map((item) => (
              <ClassItem
                key={item.id}
                classItem={item}
                onEdit={() => handleOpenModal(item)}
                onDelete={handleDeleteClass}
              />
            ))}
          </div>
        ) : (
          <ClassesEmptyState
            title="No classes match this view."
            message="Try a different search or add a new class."
          />
        )}
      </section>

      <ClassModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveClass}
        classItem={selectedClass}
        saving={saving}
        saveError={saveError}
      />
    </div>
  );
};

export default Classes;