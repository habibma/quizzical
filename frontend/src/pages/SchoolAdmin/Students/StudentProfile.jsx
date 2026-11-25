
import { useParams } from 'react-router-dom';
import { useStudents } from '../../../context/SchoolAdmin/StudentsContext';
import AdminPageHeader from '../../../components/ui/AdminPageHeader/AdminPageHeader';
import PageState from '../../../components/ui/PageState/PageState';

const StudentProfile = () => {
    const { studentId } = useParams();
    const { students } = useStudents();

    const student = students.find(
        (item) => String(item.id) === String(studentId)
    );

    if (!student) {
        return <PageState variant="error" message="Student not found." />;
    }

    return (
        <div className="student-profile">
            <AdminPageHeader eyebrow="School Admin" title={student.name} />
            <section className="student-profile__details">
                <p>Class: {student.className}</p>
                <p>Email: {student.email}</p>
            </section>
        </div>
    );
};

export default StudentProfile;