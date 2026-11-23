import { Link } from 'react-router-dom';
import './Dashboard.css';

import ClassroomIcon from '../../../assets/icons/ClassroomIcon';
import StudentIcon from '../../../assets/icons/StudentIcon';
import TeacherIcon from '../../../assets/icons/TeacherIcon';

import { useClasses } from '../../../context/SchoolAdmin/ClassesContext';
import { useStudents } from '../../../context/SchoolAdmin/StudentsContext';
import { useTeachers } from '../../../context/SchoolAdmin/TeachersContext';
import { buildActivities, formatActivityDate } from '../ActivityLog/activityUtils';

const formatNumber = (value) => new Intl.NumberFormat().format(value);

const DashboardCard = ({ icon: Icon, number, title, detail, to, tone }) => {
    return (
        <Link className={`dashboard-card dashboard-card--${tone}`} to={to}>
            <div className="dashboard-card-topline">
                <span className="dashboard-card-icon" aria-hidden="true"><Icon /></span>
                <span className="dashboard-card-arrow" aria-hidden="true">-&gt;</span>
            </div>
            <div className="dashboard-card-number">{number}</div>
            <h2>{title}</h2>
            <span className="dashboard-card-detail">{detail}</span>
        </Link>
    );
};

const Dashboard = () => {
    const { students, loading: studentsLoading, error: studentsError } = useStudents();
    const { teachers, loading: teachersLoading, error: teachersError } = useTeachers();
    const { classes, loading: classesLoading, error: classesError } = useClasses();

    const loading = studentsLoading || teachersLoading || classesLoading;
    const errors = [studentsError, teachersError, classesError].filter(Boolean);
    const pendingStudents = students.filter((student) => student.status === 'pending').length;
    const activeStudents = students.length - pendingStudents;
    const activeStudentPercentage = students.length ? Math.round((activeStudents / students.length) * 100) : 0;
    const activities = buildActivities(students, teachers);
    const recentActivities = activities.slice(0, 5);

    return (
        <div className="dashboard-container">
            <section className="dashboard-header">
                <div>
                    <p className="dashboard-eyebrow">School overview</p>
                    <h1 className="dashboard-header--title">Good morning, Admin</h1>
                    <p className="dashboard-header--description">A clear view of the people and classes that need your attention.</p>
                </div>
                <div className="dashboard-actions">
                    <Link className="dashboard-action dashboard-action--secondary" to="/principal/reports">View reports</Link>
                    <Link className="dashboard-action dashboard-action--primary" to="/principal/students">Manage students <span aria-hidden="true">-&gt;</span></Link>
                </div>
            </section>

            {errors.length > 0 && (
                <div className="dashboard-alert" role="status">
                    Some dashboard data could not be loaded. Try refreshing the related section to see the latest information.
                </div>
            )}

            <section className="dashboard-content">
                <div className="dashboard-cards">
                    <DashboardCard icon={StudentIcon} number={loading ? '...' : formatNumber(students.length)} title="Students" detail={`${formatNumber(pendingStudents)} pending review`} to="/principal/students" tone="blue" />
                    <DashboardCard icon={TeacherIcon} number={loading ? '...' : formatNumber(teachers.length)} title="Teachers" detail="View teaching staff" to="/principal/teachers" tone="green" />
                    <DashboardCard icon={ClassroomIcon} number={loading ? '...' : formatNumber(classes.length)} title="Classes" detail="Review class groups" to="/principal/classes" tone="orange" />
                    <DashboardCard icon={StudentIcon} number={loading ? '...' : formatNumber(pendingStudents)} title="Pending approvals" detail="Students needing review" to="/principal/students" tone="rose" />
                </div>
                <div className="dashboard-grid">
                    <section className="dashboard-panel dashboard-insight-panel">
                        <div className="dashboard-panel-heading">
                            <div>
                                <p className="dashboard-eyebrow">Student health</p>
                                <h2>Onboarding progress</h2>
                            </div>
                            <span className="dashboard-panel-value">{activeStudentPercentage}%</span>
                        </div>
                        <div className="dashboard-progress" aria-label={`${activeStudentPercentage}% of students are active`}>
                            <span style={{ width: `${activeStudentPercentage}%` }} />
                        </div>
                        <div className="dashboard-progress-labels">
                            <span><i className="dashboard-dot dashboard-dot--active" />{formatNumber(activeStudents)} active</span>
                            <span><i className="dashboard-dot dashboard-dot--pending" />{formatNumber(pendingStudents)} pending</span>
                        </div>
                        <Link className="dashboard-panel-link" to="/principal/students">Review student records <span aria-hidden="true">-&gt;</span></Link>
                    </section>

                    <section className="dashboard-panel dashboard-logs">
                        <div className="dashboard-panel-heading">
                            <div>
                                <p className="dashboard-eyebrow">Latest records</p>
                                <h2>Recent activity</h2>
                            </div>
                            <Link className="dashboard-panel-link" to="/principal/activity">View all</Link>
                        </div>
                        <ul className="dashboard-activity-list">
                            {recentActivities.map((activity) => {
                                const ActivityIcon = activity.type === 'student' ? StudentIcon : TeacherIcon;

                                return (
                                <li key={activity.id}>
                                    <span className={`dashboard-activity-icon dashboard-activity-icon--${activity.type}`} aria-hidden="true"><ActivityIcon /></span>
                                    <span><strong>{activity.name}</strong><small>{activity.action} · {formatActivityDate(activity.createdAt)}</small></span>
                                    <span className={`dashboard-status dashboard-status--${activity.status}`}>{activity.status}</span>
                                </li>
                                );
                            })}
                            {!loading && recentActivities.length === 0 && <li className="dashboard-empty">No records available yet.</li>}
                        </ul>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;