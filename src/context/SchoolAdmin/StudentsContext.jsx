import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    getStudents,
    createStudent,
    updateStudent as updateStudentRequest,
    deleteStudent,
    resolveSchoolId,
} from "../../services/backendService";

const StudentsContext = createContext(null);

const normalizeStudent = (student) => ({
    ...student,
    school_id: student.school_id ?? null,
    user_id: student.user_id ?? null,
    classes: Array.isArray(student.classes)
        ? student.classes
        : [],
    classes_assigned: Array.isArray(student.classes)
        ? student.classes
        : [],
    status: String(student.status ?? "pending").toLowerCase(),
});

const buildPayload = async (student) => ({
    name: student.name.trim(),
    email: student.email?.trim() || null,
    school_id: student.school_id ?? await resolveSchoolId(),
    status: String(student.status ?? "pending").toLowerCase(),
    classes_assigned: (student.classes_assigned ?? []).map(
        (item) => Number(item?.id ?? item)
    ),
});

export const StudentsProvider = ({ children }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const refreshStudents = async () => {
        try {
            setLoading(true);

            const data = await getStudents();

            setStudents(
                Array.isArray(data)
                    ? data.map(normalizeStudent)
                    : []
            );

            setError("");
        } catch (error) {
            console.error(error);
            setStudents([]);
            setError("Unable to load students.");
        } finally {
            setLoading(false);
        }
    };

    const addStudent = async (student) => {
        const created = await createStudent(
            await buildPayload(student)
        );

        await refreshStudents();

        return normalizeStudent(created);
    };

    const updateStudent = async (student) => {
        const updated = await updateStudentRequest(
            student.id,
            await buildPayload(student)
        );

        await refreshStudents();

        return normalizeStudent(updated);
    };

    const removeStudent = async (id) => {
        await deleteStudent(id);
        await refreshStudents();
    };

    useEffect(() => {
        refreshStudents();
    }, []);

    return (
        <StudentsContext.Provider
            value={{
                students,
                loading,
                error,
                addStudent,
                updateStudent,
                removeStudent,
                refreshStudents,
            }}
        >
            {children}
        </StudentsContext.Provider>
    );
};

export const useStudents = () => {
    const context = useContext(StudentsContext);

    if (!context) {
        throw new Error(
            "useStudents must be used inside StudentsProvider"
        );
    }

    return context;
};