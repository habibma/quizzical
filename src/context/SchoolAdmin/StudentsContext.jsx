import {useState, useEffect, createContext, useContext} from "react";

export const StudentsContext = createContext();


const InitialStudents = [
    {
        id: 1,
        name: 'John Doe',
        className: 'Class A',
        profilePic: '/path/to/john_doe.jpg',
        email: 'john.doe@example.com',
        grade: 'A'
    },
    {
        id: 2,
        name: 'Jane Smith',
        className: 'Class B',
        profilePic: '/path/to/jane_smith.jpg',
        email: 'jane.smith@example.com',
        grade: 'B'
    },
    {
        id: 3,
        name: 'Alice Johnson',
        className: 'Class A',
        profilePic: '/path/to/alice_johnson.jpg',
        email: 'alice.johnson@example.com',
        grade: 'A'
    },
    {
        id: 4,
        name: 'Bob Williams',
        className: 'Class C',
        profilePic: '/path/to/bob_williams.jpg',
        email: 'bob.williams@example.com',
        grade: 'C'
    }
];

export const StudentsProvider = ({children}) => {
    const [students, setStudents] = useState(InitialStudents);

    const addStudent = (student) => {
        setStudents((prevStudents) => [...prevStudents, student]);
    }

    const removeStudent = (studentId) => {
        setStudents((prevStudents) => prevStudents.filter(student => student.id !== studentId));
    }

    const updateStudent = (updatedStudent) => {
        setStudents((prevStudents) => prevStudents.map(student =>
            student.id === updatedStudent.id ? updatedStudent : student
        ));
    }

    /*useEffect(() => {
        // Fetch students data from an API or database
        const fetchStudents = async () => {
            try {
                const response = await fetch('/api/students');
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);*/

    return (
        <StudentsContext.Provider value={{ students, addStudent, removeStudent, updateStudent }}>
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
}
