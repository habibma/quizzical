import { useParams } from 'react-router-dom';
import { useTeachers } from '../../../context/SchoolAdmin/TeachersContext';

const TeacherProfile = () => {
    const { teacherId } = useParams();
    const { teachers } = useTeachers();

    const teacher = teachers.find((t) => String(t.id) === String(teacherId));

    if (!teacher) {
        return <div>Teacher not found</div>;
    }

    return (
        <div className="teacher-profile">
            <h1>{teacher.name}</h1>
            <p>{teacher.email}</p>
            <p>{teacher.subject}</p>
            <p>{teacher.classesAssigned?.join(', ')}</p>
        </div>
    );
};

export default TeacherProfile;