import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button/Button';
import ConfirmDialog from '../../../components/ui/ConfirmDialog/ConfirmDialog';

import { useTeachers } from '../../../context/SchoolAdmin/TeachersContext';

import TeacherItem from './TeacherItem';
import TeacherModal from './TeacherModal';

import './Teachers.css';

const Teachers = () => {
    const navigate = useNavigate();

    const {
        teachers,
        addTeacher,
        updateTeacher,
        removeTeacher,
    } = useTeachers();

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [teacherToRemove, setTeacherToRemove] = useState(null);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('name');

    const visibleTeachers = useMemo(() => {
        const query = search.trim().toLowerCase();

        return [...teachers]
            .filter((teacher) => {
                const classes = teacher.classes_assigned
                    ?.map((item) => item.name ?? item)
                    .join(' ');

                return [
                    teacher.name,
                    teacher.email,
                    classes,
                ]
                    .filter(Boolean)
                    .some((value) =>
                        String(value).toLowerCase().includes(query)
                    );
            })
            .sort((a, b) => {
                if (sortBy === 'newest') {
                    return b.id - a.id;
                }

                return a.name.localeCompare(b.name);
            });
    }, [teachers, search, sortBy]);

    const stats = {
        total: teachers.length,
        active: teachers.filter(
            (teacher) => teacher.status === 'active'
        ).length,
        unassigned: teachers.filter(
            (teacher) => !teacher.classes_assigned?.length
        ).length,
    };

    const openModal = (teacher = null) => {
        setSelectedTeacher(teacher);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTeacher(null);
        setModalOpen(false);
    };

    const saveTeacher = async (data) => {
        if (selectedTeacher) {
            await updateTeacher({
                ...data,
                id: selectedTeacher.id,
            });
        } else {
            await addTeacher(data);
        }

        closeModal();
    };

    const confirmRemove = async () => {
        if (!teacherToRemove) return;

        await removeTeacher(teacherToRemove.id);
        setTeacherToRemove(null);
    };

    return (
        <div className="teachers-container">
            <section className="teachers-header">
                <div>
                    <p className="teachers-header__eyebrow">
                        School Admin
                    </p>

                    <h1>Teachers</h1>

                    <p>
                        Manage and review all teachers assigned to
                        the school.
                    </p>
                </div>

                <Button
                    className="btn-primary"
                    text="Add Teacher"
                    onClick={() => openModal()}
                />
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
                    <span>Unassigned</span>
                    <strong>{stats.unassigned}</strong>
                </div>
            </section>

            <section className="teachers-content">
                <div className="teachers-toolbar">
                    <input
                        type="search"
                        value={search}
                        placeholder="Search teachers"
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="name">Sort by name</option>
                        <option value="newest">Sort by newest</option>
                    </select>
                </div>

                <div className="teachers-list">
                    {visibleTeachers.length ? (
                        visibleTeachers.map((teacher) => (
                            <TeacherItem
                                key={teacher.id}
                                teacher={teacher}
                                onView={() =>
                                    navigate(
                                        `/principal/teachers/${teacher.id}`
                                    )
                                }
                                onEdit={() => openModal(teacher)}
                                onRemove={() =>
                                    setTeacherToRemove(teacher)
                                }
                            />
                        ))
                    ) : (
                        <div className="teachers-empty">
                            <h3>No teachers found.</h3>
                            <p>Try another search or add a teacher.</p>
                        </div>
                    )}
                </div>
            </section>

            <TeacherModal
                isOpen={modalOpen}
                teacher={selectedTeacher}
                onClose={closeModal}
                onSave={saveTeacher}
            />

            <ConfirmDialog
                isOpen={Boolean(teacherToRemove)}
                title="Remove teacher?"
                message={`Are you sure you want to remove ${
                    teacherToRemove?.name || 'this teacher'
                }?`}
                confirmText="Remove"
                cancelText="Keep teacher"
                onClose={() => setTeacherToRemove(null)}
                onConfirm={confirmRemove}
            />
        </div>
    );
};

export default Teachers;