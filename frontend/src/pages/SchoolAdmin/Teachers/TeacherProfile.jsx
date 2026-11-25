import { useParams } from 'react-router-dom';
import { useTeachers } from '../../../context/SchoolAdmin/TeachersContext';
import AdminPageHeader from '../../../components/ui/AdminPageHeader/AdminPageHeader';
import PageState from '../../../components/ui/PageState/PageState';

const TeacherProfile = () => {
    const { teacherId } = useParams();
    const { teachers } = useTeachers();

    const teacher = teachers.find((t) => String(t.id) === String(teacherId));

    if (!teacher) {
        return <PageState variant="error" message="Teacher not found." />;
    }

    const assignedClasses = (teacher.classes_assigned || [])
        .map((assignedClass) => typeof assignedClass === 'string' ? assignedClass : assignedClass.name)
        .filter(Boolean);

    return (
        <div className="teacher-profile">
            <AdminPageHeader eyebrow="School Admin" title={teacher.name} />
            <section className="teacher-profile__details">
                <p>{teacher.email}</p>
                <p>{assignedClasses.join(', ') || 'No classes assigned'}</p>
            </section>
        </div>
    );
};

export default TeacherProfile;