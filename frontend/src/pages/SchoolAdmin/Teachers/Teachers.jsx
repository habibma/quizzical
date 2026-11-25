import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button/Button';
import ConfirmDialog from '../../../components/ui/ConfirmDialog/ConfirmDialog';
import AdminPageHeader from '../../../components/ui/AdminPageHeader/AdminPageHeader';
import PageState from '../../../components/ui/PageState/PageState';
import SearchInput from '../../../components/ui/SearchInput/SearchInput';
import SummaryCards from '../../../components/ui/SummaryCards/SummaryCards';

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
            <AdminPageHeader
                eyebrow="School Admin"
                title="Teachers"
                description="Manage and review all teachers assigned to the school."
                actions={<Button className="btn-primary" text="Add Teacher" onClick={() => openModal()} />}
                classNames={{
                    root: 'teachers-header',
                    content: 'teachers-header__content',
                    eyebrow: 'teachers-header__eyebrow',
                    description: 'teachers-header--description',
                }}
            />

            <SummaryCards
                ariaLabel="Teacher summary"
                className="teacher-summary-grid"
                cardClassName="teacher-summary-card"
                items={[
                    { label: 'Total Teachers', value: stats.total },
                    { label: 'Active', value: stats.active },
                    { label: 'Unassigned', value: stats.unassigned },
                ]}
            />

            <section className="teachers-content">
                <div className="teachers-toolbar">
                    <SearchInput
                        value={search}
                        placeholder="Search teachers"
                        onChange={(e) => setSearch(e.target.value)}
                        ariaLabel="Search teachers"
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
                        <PageState
                            className="teachers-empty"
                            title="No teachers found."
                            message="Try another search or add a teacher."
                        />
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