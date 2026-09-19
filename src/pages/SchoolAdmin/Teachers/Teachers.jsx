
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button/Button';
import ConfirmDialog from '../../../components/ui/ConfirmDialog/ConfirmDialog';
import { useTeachers } from '../../../context/SchoolAdmin/TeachersContext';

import TeacherItem from './TeacherItem';
import TeacherModal from './TeacherModal';

import './Teachers.css';

const SchoolTeachers = () => {
    const navigate = useNavigate();
    const { teachers, addTeacher, removeTeacher } = useTeachers();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [selectedTeacherToRemove, setSelectedTeacherToRemove] = useState(null);

    const subjectOptions = useMemo(() => {
        return [...new Set(teachers.map((teacher) => teacher.subject).filter(Boolean))];
    }, [teachers]);

    const visibleTeachers = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        const filtered = teachers.filter((teacher) => {
            const matchesSearch = !query || [teacher.name, teacher.email, teacher.subject, teacher.classesAssigned.join(' ')]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(query));

            const matchesSubject = selectedSubject === 'all' || teacher.subject === selectedSubject;

            return matchesSearch && matchesSubject;
        });

        return [...filtered].sort((a, b) => {
            if (sortBy === 'subject') {
                return a.subject.localeCompare(b.subject) || a.name.localeCompare(b.name);
            }

            if (sortBy === 'newest') {
                return Number(b.id) - Number(a.id);
            }

            return a.name.localeCompare(b.name);
        });
    }, [teachers, searchTerm, selectedSubject, sortBy]);

    const stats = useMemo(() => ({
        total: teachers.length,
        active: teachers.filter((teacher) => teacher.status === 'Active').length,
        departments: new Set(teachers.map((teacher) => teacher.subject).filter(Boolean)).size,
        //classesAssigned: teachers.reduce((sum, teacher) => sum + teacher.classesAssigned.length, 0),
    }), [teachers]);

    const handleViewTeacher = (teacher) => {
        // Navigate to the teacher's profile page
        navigate(`/principal/teachers/${teacher.id}`);
    };

    const handleRemoveTeacher = (teacher) => {
        removeTeacher(teacher.id);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleAddTeacher = (teacherData) => {
        addTeacher(teacherData);
        handleCloseModal();
    };

    const handleOpenRemoveModal = (teacher) => {
        setSelectedTeacherToRemove(teacher);
    }

    const handleCloseRemoveModal = () => {
        setSelectedTeacherToRemove(null);
    }

    const handleConfirmRemoveTeacher = () => {
        if (!selectedTeacherToRemove) return;

        removeTeacher(selectedTeacherToRemove.id);
        setSelectedTeacherToRemove(null);
    };

    return (
        <div className="teachers-container">
            <section className="teachers-header">
                <div className="teachers-header__content">
                    <p className="teachers-header__eyebrow">School Admin</p>
                    <h1 className="teachers-header--title">Teachers</h1>
                    <p className="teachers-header--description">
                        Manage and review all teachers assigned to the school.
                    </p>
                </div>

                <div className="teachers-header__actions">
                    <Button
                        className="btn-primary teachers-actions--add"
                        text="Add Teacher"
                        onClick={handleOpenModal}
                    />
                </div>
            </section>

            <section className="teacher-summary-grid">
                <div className="teacher-summary-card">
                    <span>Total Teachers</span>
                    <strong>{stats.total}</strong>
                </div>
                <div className="teacher-summary-card">
                    <span>Active</span>
                    <strong>{stats.active}</strong>
                </div>
                <div className="teacher-summary-card">
                    <span>Departments</span>
                    <strong>{stats.departments}</strong>
                </div>
                <div className="teacher-summary-card">
                    <span>Assigned Classes</span>
                    <strong>{stats.classesAssigned}</strong>
                </div>
            </section>

            <section className="teachers-content">
                <div className="teachers-toolbar">
                    <div className="teachers-toolbar__controls">
                        <input
                            className="teachers-toolbar__search"
                            type="search"
                            value={searchTerm}
                            placeholder="Search teachers"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Search teachers"
                        />

                        <select
                            className="teachers-toolbar__select"
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            aria-label="Filter by subject"
                        >
                            <option value="all">All subjects</option>
                            {subjectOptions.map((subject) => (
                                <option key={subject} value={subject}>
                                    {subject}
                                </option>
                            ))}
                        </select>

                        <select
                            className="teachers-toolbar__select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            aria-label="Sort teachers"
                        >
                            <option value="name">Sort by name</option>
                            <option value="subject">Sort by subject</option>
                            <option value="newest">Sort by newest</option>
                        </select>
                    </div>

                    <div className="teachers-actions">
                        <Button
                            className="btn-secondary"
                            text="Import Teachers"
                            onClick={() => console.log('Import Teachers clicked')}
                        />
                        <Button
                            className="btn-secondary"
                            text="Export Teachers"
                            onClick={() => console.log('Export Teachers clicked')}
                        />
                    </div>
                </div>

                <div className="teachers-list-header">
                    <h2>Teacher List</h2>
                    <span>{visibleTeachers.length} teachers</span>
                </div>

                <div className="teachers-list">
                    {visibleTeachers.length > 0 ? (
                        visibleTeachers.map((teacher) => (
                            <TeacherItem
                                key={teacher.id}
                                teacher={teacher}
                                onView={handleViewTeacher}
                                onRemove={() => handleOpenRemoveModal(teacher)}
                            />
                        ))
                    ) : (
                        <div className="teachers-empty">
                            <h3>No teachers match this view.</h3>
                            <p>Try a different search or add a new teacher.</p>
                        </div>
                    )}
                </div>
            </section>

            <TeacherModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleAddTeacher}
            />

            <ConfirmDialog
                isOpen={Boolean(selectedTeacherToRemove)}
                title="Remove teacher?"
                message={`Are you sure you want to remove ${selectedTeacherToRemove?.name || 'this teacher'}?`}
                confirmText="Remove"
                cancelText="Keep teacher"
                onClose={handleCloseRemoveModal}
                onConfirm={handleConfirmRemoveTeacher}
            />
        </div>
    );
};

export default SchoolTeachers