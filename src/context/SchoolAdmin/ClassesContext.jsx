import { createContext, useContext, useEffect, useState } from 'react';
import {
    getClasses,
    createClass,
    updateClass,
    deleteClass,
} from '../../services/backendService';

const ClassesContext = createContext(null);

const normalizeClass = (classroom = {}) => ({
    id: classroom.id,
    name: classroom.name,
    description: classroom.description ?? ''
});

const buildClassPayload = (classData) => ({
    name: classData.name,
    description: classData.description || '',
    teacher_id: classData.teacher_id
});

export const ClassesProvider = ({ children }) => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const refreshClasses = async () => {
        try {
            setLoading(true);
            const data = await getClasses();
            setClasses(Array.isArray(data) ? data : []);
            setError('');
            return data;
        } catch (err) {
            console.error('Error fetching classes:', err);
            setClasses([]);
            setError('Unable to load classes from the database.');
            return [];
        } finally {
            setLoading(false);
        }
    };

    const addClass = async (classData) => {
        try {
            const createdClass = await createClass(buildClassPayload(classData));
            await refreshClasses();
            return createdClass;
        } catch (err) {
            console.error('Error creating class:', err);
            throw err;
        }
    };

    const updateClassItem = async (classData) => {
        try {
            const classId = classData.id;
            const updatedClass = await updateClass(classId, buildClassPayload(classData));
            await refreshClasses();
            return updatedClass;
        } catch (err) {
            console.error('Error updating class:', err);
            throw err;
        }
    };

    const removeClass = async (classId) => {
        try {
            await deleteClass(classId);
            await refreshClasses();
            return true;
        } catch (err) {
            console.error('Error deleting class:', err);
            throw err;
        }
    };

    useEffect(() => {
        refreshClasses();
    }, []);

    return (
        <ClassesContext.Provider
            value={{
                classes,
                loading,
                error,
                addClass,
                updateClassItem,
                removeClass,
                refreshClasses,
            }}
        >
            {children}
        </ClassesContext.Provider>
    );
};

export const useClasses = () => {
    const context = useContext(ClassesContext);

    if (!context) {
        throw new Error('useClasses must be used within a ClassesProvider');
    }

    return context;
};
