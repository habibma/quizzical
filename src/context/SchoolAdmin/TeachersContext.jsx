import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import {
    getTeachers,
    createTeacher,
    updateTeacher as updateTeacherRequest,
    deleteTeacher,
    resolveSchoolId,
} from '../../services/backendService';

const TeachersContext = createContext(null);

const normalizeTeacher = (teacher) => ({
    ...teacher,
    school_id: teacher.school_id ?? null,
    user_id: teacher.user_id ?? null,
    classes_assigned: Array.isArray(teacher.classes_assigned)
        ? teacher.classes_assigned
        : [],
    status: String(teacher.status ?? 'active').toLowerCase(),
});

const buildPayload = async (teacher) => ({
    name: teacher.name.trim(),
    email: teacher.email.trim(),
    status: String(teacher.status ?? 'active').toLowerCase(),
    school_id: teacher.school_id ?? await resolveSchoolId(),
    classes_assigned: (teacher.classes_assigned ?? []).map(
        (item) => Number(item.id ?? item)
    ),
});

export const TeachersProvider = ({ children }) => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const refreshTeachers = async () => {
        try {
            setLoading(true);

            const data = await getTeachers();

            setTeachers(
                Array.isArray(data)
                    ? data.map(normalizeTeacher)
                    : []
            );

            setError('');
        } catch (error) {
            console.error(error);
            setTeachers([]);
            setError('Unable to load teachers.');
        } finally {
            setLoading(false);
        }
    };

    const addTeacher = async (teacher) => {
        const created = await createTeacher(
            await buildPayload(teacher)
        );

        await refreshTeachers();

        return normalizeTeacher(created);
    };

    const updateTeacher = async (teacher) => {
        const updated = await updateTeacherRequest(
            teacher.id,
            await buildPayload(teacher)
        );

        await refreshTeachers();

        return normalizeTeacher(updated);
    };

    const removeTeacher = async (id) => {
        await deleteTeacher(id);
        await refreshTeachers();
    };

    useEffect(() => {
        refreshTeachers();
    }, []);

    return (
        <TeachersContext.Provider
            value={{
                teachers,
                loading,
                error,
                addTeacher,
                updateTeacher,
                removeTeacher,
                refreshTeachers,
            }}
        >
            {children}
        </TeachersContext.Provider>
    );
};

export const useTeachers = () => {
    const context = useContext(TeachersContext);

    if (!context) {
        throw new Error(
            'useTeachers must be used inside TeachersProvider'
        );
    }

    return context;
};