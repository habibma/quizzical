
import { useParams } from 'react-router-dom';
import { useStudents } from '../../../context/SchoolAdmin/StudentsContext';

const StudentProfile = () => {
    const { studentId } = useParams();
    const { students } = useStudents();

    const student = students.find(
        (item) => String(item.id) === String(studentId)
    );

    if (!student) {
        return <p>Student not found.</p>;
    }

    return (
        <div>
            <h1>{student.name}</h1>
            <p>Class: {student.className}</p>
            <p>Email: {student.email}</p>
        </div>
    );
};

export default StudentProfile;