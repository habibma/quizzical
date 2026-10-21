import { useState, useEffect, createContext, useContext } from "react";
import {
    getStudents,
    createStudent,
    updateStudent as updateStudentRequest,
    deleteStudent,
} from "../../services/backendService";

export const StudentsContext = createContext();

const normalizeStudent = (student = {}) => ({
    id: student.id,
    name: student.name,
    email: student.email,
    class_id: student.class_id ?? student.classId ?? null,
    status: student.status ?? "pending",
});

const buildStudentPayload = (student) => ({
    name: student.name,
    email: student.email,
    class_id: student.class_id,
    profilePic: student.profilePic ?? null,
    status: student.status ?? "pending",
});

export const StudentsProvider = ({ children }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const refreshStudents = async () => {
        try {
            setLoading(true);
            const data = await getStudents();
            setStudents(Array.isArray(data) ? data.map(normalizeStudent) : []);
            setError('');
            return data;
        } catch (err) {
            console.error('Error fetching students:', err);
            setStudents([]);
            setError('Unable to load students from the database.');
            return [];
        } finally {
            setLoading(false);
        }
    };

    const addStudent = async (student) => {
        try {
            const createdStudent = await createStudent(buildStudentPayload(student));
            await refreshStudents();
            return createdStudent;
        } catch (err) {
            console.error('Error creating student:', err);
            throw err;
        }
    };

    const removeStudent = async (studentId) => {
        try {
            await deleteStudent(studentId);
            await refreshStudents();
            return true;
        } catch (err) {
            console.error('Error deleting student:', err);
            throw err;
        }
    };

    const updateStudent = async (updatedStudent) => {
        try {
            const currentId = updatedStudent.id;
            const updated = await updateStudentRequest(currentId, buildStudentPayload(updatedStudent));
            await refreshStudents();
            return normalizeStudent(updated);
        } catch (err) {
            console.error('Error updating student:', err);
            throw err;
        }
    };

    useEffect(() => {
        refreshStudents();
    }, []);

    return (
        <StudentsContext.Provider value={{ students, loading, error, addStudent, removeStudent, updateStudent, refreshStudents }}>
            {children}
        </StudentsContext.Provider>
    );
};

export const useStudents = () => {
    const context = useContext(StudentsContext);
    if (!context) {
        throw new Error('useStudents must be used within a StudentsProvider');
    }
    return context;
};
