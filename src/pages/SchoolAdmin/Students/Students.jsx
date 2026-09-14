import React, { useState } from 'react';
import { useStudents } from '../../../context/SchoolAdmin/StudentsContext';

import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';

import './Students.css';

// Student list, profiles, and class assignments.

const StudentModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        className: '',
        email: '',
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

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
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <h2>Add New Student</h2>
            <p>Enter student details below:</p>

            <form onSubmit={handleSubmit}>
                <Input
                    label="Name"
                    name="name"
                    placeholder="Enter student name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Class"
                    name="className"
                    placeholder="Enter class name"
                    value={formData.className}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Email"
                    name="email"
                    inputType="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <div className="modal-actions">
                    <Button
                        className="btn-primary"
                        text="Save"
                        type="submit"
                    />

                    <Button
                        className="btn-secondary"
                        text="Cancel"
                        onClick={onClose}
                    />
                </div>
            </form>
        </Modal>
    );
};

const StudentItem = ({ name, className, profilePic, onRemove }) => {
    return (
        <div className="student-item">
            <span
                type="button"
                className="student-item--remove"
                onClick={onRemove}
                aria-label={`Remove ${name}`}
            >
                ✖
            </span>

            {profilePic ? (
                <img
                    src={profilePic}
                    alt={`${name}'s profile`}
                    className="student-item--profile-pic"
                />
            ) : (
                <div className="student-item--profile-placeholder">
                    {name?.charAt(0).toUpperCase()}
                </div>
            )}

            <div className="student-item--info">
                <h3 className="student-item--name">{name}</h3>
                <p className="student-item--class">{className}</p>
            </div>
        </div>
    );
};

const SchoolStudents = () => {
    const {
        students,
        addStudent,
        removeStudent,
    } = useStudents();

    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleRemoveStudent = (studentId) => {
        const confirmed = window.confirm(
            'Are you sure you want to remove this student?'
        );

        if (confirmed) {
            removeStudent(studentId);
        }
    };

    return (
        <div className="students-container">
            <section className="students-header">
                <h1 className="students-header--title">Students</h1>

                <p className="students-header--description">
                    Manage and view all the students in your school.
                </p>
            </section>

            <section className="students-content">
                <h2>Student List</h2>

                <div className="students-list">
                    {students?.length > 0 ? (
                        students.map((student) => (
                            <StudentItem
                                key={student.id}
                                name={student.name}
                                className={student.className}
                                profilePic={student.profilePic}
                                onRemove={() =>
                                    handleRemoveStudent(student.id)
                                }
                            />
                        ))
                    ) : (
                        <p className="students-empty">
                            No students have been added yet.
                        </p>
                    )}
                </div>

                <div className="students-actions">
                    <Button
                        className="btn-primary students-actions--add"
                        text="Add Student"
                        onClick={handleOpenModal}
                    />

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
            </section>

            <section className="students-footer">
                <p>&copy; 2024 School Admin. All rights reserved.</p>
            </section>

            <StudentModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleAddStudent}
            />
        </div>
    );
};

export default SchoolStudents;