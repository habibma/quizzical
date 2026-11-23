import React, { useMemo, useState } from 'react';
import { useStudents } from '../../../context/SchoolAdmin/StudentsContext';
import { useClasses } from '../../../context/SchoolAdmin/ClassesContext';

import Button from '../../../components/ui/Button/Button';
import ConfirmDialog from '../../../components/ui/ConfirmDialog/ConfirmDialog';

import StudentModal from './StudentModal';
import StudentItem from './StudentItem';

import './Students.css';

const normalizeStudent = (student = {}) => {
    const classes = Array.isArray(student.classes)
        ? student.classes
        : [];

    return {
        id: student.id,
        name: student.name ?? "Unnamed student",
        email: student.email ?? "",
        classes,
        className:
            classes.map((item) => item.name).join(", ") ||
            "Unassigned",
        profilePic: student.profilePic ?? null,
        status: String(
            student.status ?? "pending"
        ).toLowerCase(),
    };
};

const SchoolStudents = () => {
    const { classes } = useClasses();
    const {
        students: rawStudents,
        addStudent,
        updateStudent,
        removeStudent,
    } = useStudents();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [studentToRemove, setStudentToRemove] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState('');

    const students = useMemo(
        () => rawStudents.map(normalizeStudent),
        [rawStudents]
    );

    const classOptions = useMemo(() => {
        const names = new Set([
            ...classes.map((item) => item.name).filter(Boolean),
            ...students.map((student) => student.className).filter(Boolean),
        ]);

        return [...names];
    }, [classes, students]);

    const visibleStudents = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        const filtered = students.filter((student) => {
            const matchesSearch = !query || [student.name, student.email, student.className]
                .filter(Boolean)
                .some((value) => String(value).toLowerCase().includes(query));

            const matchesClass = selectedClass === 'all' || student.className === selectedClass;

            return matchesSearch && matchesClass;
        });

        return [...filtered].sort((a, b) => {
            if (sortBy === 'class') {
                return String(a.className || '').localeCompare(String(b.className || '')) || a.name.localeCompare(b.name);
            }

            if (sortBy === 'newest') {
                return Number(b.id) - Number(a.id);
            }

            return a.name.localeCompare(b.name);
        });
    }, [students, searchTerm, selectedClass, sortBy]);

    const stats = useMemo(() => ({
        total: students.length,
        classCount: new Set(students.map((student) => student.className).filter(Boolean)).size,
        active: students.filter((student) => student.status === 'active').length,
    }), [students]);

    const handleOpenModal = (student = null) => {
        setSelectedStudent(student);
        setSaveError('');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedStudent(null);
        setSaveError('');
    };

    const handleSaveStudent = async (studentData) => {
        setSaving(true);
        setSaveError('');

        try {
            if (selectedStudent) {
                await updateStudent({
                    ...studentData,
                    id: selectedStudent.id,
                });
            } else {
                await addStudent(studentData);
            }

            handleCloseModal();
        } catch (error) {
            console.error('Failed to save student:', error);
            setSaveError(error.message || 'Unable to save this student.');
        } finally {
            setSaving(false);
        }
    };


    const handleImportStudents = () => {
        console.log('Import Students button clicked');
    };

    const handleExportStudents = () => {
        console.log('Export Students button clicked');
    };

    const handleOpenRemoveModal = (student) => {
        setStudentToRemove(student);
    };

    const handleCloseRemoveModal = () => {
        setStudentToRemove(null);
    };

    const handleRemoveStudent = async () => {
        if (!studentToRemove) return;

        try {
            await removeStudent(studentToRemove.id);
            setStudentToRemove(null);
        } catch (error) {
            console.error('Failed to remove student:', error);
        }
    };

    return (
        <div className="students-container">
            <section className="students-header">
                <div className="students-header__content">
                    <p className="students-header__eyebrow">School Admin</p>
                    <h1 className="students-header--title">Students</h1>
                    <p className="students-header--description">
                        Manage and view all the students in your school.
                    </p>
                </div>

                <div className="students-header__actions">
                    <Button
                        className="btn-primary students-actions--add"
                        text="Add Student"
                        onClick={() => handleOpenModal()}
                    />
                </div>
            </section>

            <section className="student-summary-grid">
                <div className="student-summary-card">
                    <span>Total Students</span>
                    <strong>{stats.total}</strong>
                </div>
                <div className="student-summary-card">
                    <span>Classes</span>
                    <strong>{stats.classCount}</strong>
                </div>
                <div className="student-summary-card">
                    <span>Active</span>
                    <strong>{stats.active}</strong>
                </div>
            </section>

            <section className="students-content">
                <div className="students-toolbar">
                    <div className="students-toolbar__controls">
                        <input
                            className="students-toolbar__search"
                            type="search"
                            value={searchTerm}
                            placeholder="Search students"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Search students"
                        />

                        <select
                            className="students-toolbar__select"
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            aria-label="Filter by class"
                        >
                            <option value="all">All classes</option>
                            {classOptions.map((className) => (
                                <option key={className} value={className}>
                                    {className}
                                </option>
                            ))}
                        </select>

                        <select
                            className="students-toolbar__select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            aria-label="Sort students"
                        >
                            <option value="name">Sort by name</option>
                            <option value="class">Sort by class</option>
                            <option value="newest">Sort by newest</option>
                        </select>
                    </div>

                    <div className="students-actions">
                        <Button
                            className="btn-secondary students-actions--import"
                            text="Import Students"
                            onClick={handleImportStudents}
                        />

                        <Button
                            className="btn-secondary students-actions--export"
                            text="Export Students"
                            onClick={handleExportStudents}
                        />
                    </div>
                </div>

                <div className="students-list-header">
                    <h2>Student List</h2>
                    <span>{visibleStudents.length} students</span>
                </div>

                <div className="students-list">
                    {visibleStudents.length > 0 ? (
                        visibleStudents.map((student) => (
                            <StudentItem
                                key={student.id}
                                id={student.id}
                                name={student.name}
                                className={student.className}
                                email={student.email}
                                profilePic={student.profilePic}
                                status={student.status}
                                isSelected={selectedStudentId === student.id}
                                onSelect={() => setSelectedStudentId(student.id)}
                                onEdit={() => handleOpenModal(student)}
                                onRemove={() => handleOpenRemoveModal(student)}
                            />
                        ))
                    ) : (
                        <div className="students-empty">
                            <h3>No students match this view.</h3>
                            <p>Try a different search or add a new student.</p>
                        </div>
                    )}
                </div>
            </section>

            <section className="students-footer">
                <p>&copy; 2024 School Admin. All rights reserved.</p>
            </section>

            <StudentModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveStudent}
                student={selectedStudent}
                saving={saving}
                saveError={saveError}
            />

            <ConfirmDialog
                isOpen={Boolean(studentToRemove)}
                title="Remove student?"
                message={`Are you sure you want to remove ${studentToRemove?.name || 'this student'} from the student list?`}
                confirmText="Remove"
                cancelText="Keep student"
                onClose={handleCloseRemoveModal}
                onConfirm={handleRemoveStudent}
            />
        </div>
    );
};

export default SchoolStudents;