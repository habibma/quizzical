import { createContext, useContext, useState } from 'react';

export const TeachersContext = createContext();

const initialTeachers = [
    {
        id: 1,
        name: 'Sarah Thompson',
        email: 'sarah.thompson@school.edu',
        subject: 'Mathematics',
        classesAssigned: ['Grade 7A', 'Grade 8B'],
        status: 'Active',
        profilePic: null,
    },
    {
        id: 2,
        name: 'Daniel Brooks',
        email: 'daniel.brooks@school.edu',
        subject: 'Science',
        classesAssigned: ['Grade 9A'],
        status: 'On Leave',
        profilePic: null,
    },
    {
        id: 3,
        name: 'Aisha Patel',
        email: 'aisha.patel@school.edu',
        subject: 'English',
        classesAssigned: ['Grade 6B', 'Grade 7A'],
        status: 'Active',
        profilePic: null,
    },
    {
        id: 4,
        name: 'Michael Chen',
        email: 'michael.chen@school.edu',
        subject: 'History',
        classesAssigned: ['Grade 10A', 'Grade 11B'],
        status: 'Inactive',
        profilePic: null,
    },
    {
        id: 5,
        name: 'Emma Rodriguez',
        email: 'emma.rodriguez@school.edu',
        subject: 'Art',
        classesAssigned: ['Grade 5A', 'Grade 6A'],
        status: 'Active',
        profilePic: null,
    },
    {
        id: 6,
        name: 'James Martin',
        email: 'james.martin@school.edu',
        subject: 'Computer Science',
        classesAssigned: ['Grade 8A', 'Grade 9B'],
        status: 'Active',
        profilePic: null,
    },
];

export const TeachersProvider = ({ children }) => {
    const [teachers, setTeachers] = useState(initialTeachers);

    const addTeacher = (teacher) => {
        setTeachers((prevTeachers) => [...prevTeachers, teacher]);
    };

    const removeTeacher = (teacherId) => {
        setTeachers((prevTeachers) =>
            prevTeachers.filter((teacher) => String(teacher.id) !== String(teacherId))
        );
    };

    const updateTeacher = (updatedTeacher) => {
        setTeachers((prevTeachers) =>
            prevTeachers.map((teacher) =>
                String(teacher.id) === String(updatedTeacher.id) ? updatedTeacher : teacher
            )
        );
    };

    return (
        <TeachersContext.Provider value={{ teachers, addTeacher, removeTeacher, updateTeacher }}>
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
