import React, { useMemo, useState } from 'react';
import { useStudents } from '../../../context/SchoolAdmin/StudentsContext';

import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';

import './Students.css';

const StudentModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        className: '',
        email: '',
    });
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    };

    const validateForm = () => {
        const nextErrors = {};
        const name = formData.name.trim();
        const className = formData.className.trim();
        const email = formData.email.trim();

        if (!name) {
            nextErrors.name = 'Student name is required.';
        }

        if (!className) {
            nextErrors.className = 'Class is required.';
        }

        if (!email) {
            nextErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            nextErrors.email = 'Please enter a valid email address.';
        }

        return nextErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const nextErrors = validateForm();

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        const studentData = {
            id: Date.now().toString(),
            name: formData.name.trim(),
            className: formData.className.trim(),
            email: formData.email.trim(),
            profilePic: null,
            grade: null,
        };

        onSave(studentData);

        setFormData({
            name: '',
            className: '',
            email: '',
        });
        setErrors({});
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen} customClass="student-modal">
            <div className="student-modal__header">
                <h2>Add New Student</h2>
                <p>Enter student details below to add them to this school.</p>
            </div>

            <form className="student-modal__form" onSubmit={handleSubmit}>
                <div className="student-modal__field">
                    <Input
                        id="student-name"
                        label="Name"
                        name="name"
                        placeholder="Enter student name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                </div>

                <div className="student-modal__field">
                    <Input
                        id="student-class"
                        label="Class"
                        name="className"
                        placeholder="Enter class name"
                        value={formData.className}
                        onChange={handleChange}
                        required
                    />
                    {errors.className && <span className="field-error">{errors.className}</span>}
                </div>

                <div className="student-modal__field">
                    <Input
                        id="student-email"
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className="modal-actions">
                    <Button
                        className="btn-secondary"
                        text="Cancel"
                        type="button"
                        onClick={onClose}
                    />

                    <Button
                        className="btn-primary"
                        text="Save"
                        type="submit"
                    />
                </div>
            </form>
        </Modal>
    );
};

const ConfirmRemoveModal = ({ isOpen, studentName, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <Modal onClose={onClose} isOpen={isOpen} customClass="confirm-modal">
            <div className="confirm-modal__header">
                <h2>Remove Student</h2>
            </div>

            <p className="confirm-modal__message">
                Are you sure you want to remove <strong>{studentName}</strong> from the student list?
            </p>

            <div className="modal-actions">
                <Button
                    className="btn-secondary"
                    text="Cancel"
                    type="button"
                    onClick={onClose}
                />
                <Button
                    className="btn-danger"
                    text="Remove"
                    type="button"
                    onClick={onConfirm}
                />
            </div>
        </Modal>
    );
};

const StudentItem = ({ name, className, email, profilePic, grade, onRemove }) => {
    const initials = name?.charAt(0).toUpperCase() || '?';

    return (
        <article className="student-item">
            <button
                type="button"
                className="student-item--remove"
                onClick={onRemove}
                aria-label={`Remove ${name}`}
            >
                Remove
            </button>

            <div className="student-item--row">
                {profilePic ? (
                    <img
                        src={profilePic}
                        alt={`${name}'s profile`}
                        className="student-item--profile-pic"
                    />
                ) : (
                    <div className="student-item--profile-placeholder">
                        {initials}
                    </div>
                )}

                <div className="student-item--info">
                    <div className="student-item--topline">
                        <h3 className="student-item--name">{name}</h3>
                        {grade && <span className="student-item--grade">{grade}</span>}
                    </div>
                    <p className="student-item--class">{className}</p>
                    {email && <p className="student-item--email">{email}</p>}
                </div>
            </div>
        </article>
    );
};

const SchoolStudents = () => {
    const {
        students,
        addStudent,
        removeStudent,
    } = useStudents();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [studentToRemove, setStudentToRemove] = useState(null);

    const classOptions = useMemo(() => {
        return [...new Set(students.map((student) => student.className).filter(Boolean))];
    }, [students]);

    const visibleStudents = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        const filtered = students.filter((student) => {
            const matchesSearch = !query || [student.name, student.email, student.className]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(query));

            const matchesClass = selectedClass === 'all' || student.className === selectedClass;

            return matchesSearch && matchesClass;
        });

        return [...filtered].sort((a, b) => {
            if (sortBy === 'class') {
                return a.className.localeCompare(b.className) || a.name.localeCompare(b.name);
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
        graded: students.filter((student) => student.grade).length,
    }), [students]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddStudent = (studentData) => {
        addStudent(studentData);
        handleCloseModal();
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

    const handleRemoveStudent = () => {
        if (!studentToRemove) return;

        removeStudent(studentToRemove.id);
        setStudentToRemove(null);
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
                        onClick={handleOpenModal}
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
                    <span>Graded</span>
                    <strong>{stats.graded}</strong>
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
                                name={student.name}
                                className={student.className}
                                email={student.email}
                                grade={student.grade}
                                profilePic={student.profilePic}
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
                onSave={handleAddStudent}
            />

            <ConfirmRemoveModal
                isOpen={Boolean(studentToRemove)}
                studentName={studentToRemove?.name || ''}
                onClose={handleCloseRemoveModal}
                onConfirm={handleRemoveStudent}
            />
        </div>
    );
};

export default SchoolStudents;