import { createContext, useContext, useEffect, useState } from 'react';
import {
    getTeachers,
    createTeacher,
    updateTeacher as updateTeacherRequest,
    deleteTeacher,
} from '../../services/backendService';

export const TeachersContext = createContext();

const normalizeTeacher = (teacher = {}) => ({
    id: teacher.id,
    name: teacher.name,
    email: teacher.email,
    subject: teacher.subject ?? 'General',
    classes_assigned: Array.isArray(teacher.classes_assigned) ? teacher.classes_assigned : [],
    status: teacher.status ?? 'active',
    profile_pic: teacher.profile_pic ?? null,
});

const buildTeacherPayload = (teacher) => ({
    name: teacher.name,
    email: teacher.email,
    subject: teacher.subject ?? 'General',
    status: teacher.status ?? 'active',
    profile_pic: teacher.profile_pic ?? null,
    classes_assigned: teacher.classes_assigned ?? [],
});

export const TeachersProvider = ({ children }) => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const refreshTeachers = async () => {
        try {
            setLoading(true);
            const data = await getTeachers();
            setTeachers(Array.isArray(data) ? data.map(normalizeTeacher) : []);
            setError('');
            return data;
        } catch (err) {
            console.error('Error fetching teachers:', err);
            setTeachers([]);
            setError('Unable to load teachers from the database.');
            return [];
        } finally {
            setLoading(false);
        }
    };

    const addTeacher = async (teacher) => {
        try {
            const createdTeacher = await createTeacher(buildTeacherPayload(teacher));
            await refreshTeachers();
            return normalizeTeacher(createdTeacher);
        } catch (err) {
            console.error('Error creating teacher:', err);
            throw err;
        }
    };

    const removeTeacher = async (teacherId) => {
        try {
            await deleteTeacher(teacherId);
            await refreshTeachers();
            return true;
        } catch (err) {
            console.error('Error deleting teacher:', err);
            throw err;
        }
    };

    const updateTeacher = async (updatedTeacher) => {
        try {
            const teacherId = updatedTeacher.id;
            const savedTeacher = await updateTeacherRequest(teacherId, buildTeacherPayload(updatedTeacher));
            await refreshTeachers();
            return normalizeTeacher(savedTeacher);
        } catch (err) {
            console.error('Error updating teacher:', err);
            throw err;
        }
    };

    useEffect(() => {
        refreshTeachers();
    }, []);

    return (
        <TeachersContext.Provider value={{ teachers, loading, error, addTeacher, removeTeacher, updateTeacher, refreshTeachers }}>
            {children}
        </TeachersContext.Provider>
    );
};

export const useTeachers = () => {
    const context = useContext(TeachersContext);

    if (!context) {
        throw new Error('useTeachers must be used within a TeachersProvider');
    }

    return context;
};
