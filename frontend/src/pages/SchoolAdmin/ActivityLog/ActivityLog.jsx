import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import StudentIcon from '../../../assets/icons/StudentIcon';
import TeacherIcon from '../../../assets/icons/TeacherIcon';
import ClassroomIcon from '../../../assets/icons/ClassroomIcon';
import { useClasses } from '../../../context/SchoolAdmin/ClassesContext';
import { useStudents } from '../../../context/SchoolAdmin/StudentsContext';
import { useTeachers } from '../../../context/SchoolAdmin/TeachersContext';
import { buildActivities, formatActivityDate } from './activityUtils';
import './ActivityLog.css';

const ActivityIcon = ({ type }) => {
    const Icon = type === 'student' || type === 'enrollment' ? StudentIcon : type === 'teacher' || type === 'assignment' ? TeacherIcon : ClassroomIcon;
    return <Icon />;
};

const ActivityLog = () => {
    const { students, loading: studentsLoading, error: studentsError } = useStudents();
    const { teachers, loading: teachersLoading, error: teachersError } = useTeachers();
    const { classes, loading: classesLoading, error: classesError } = useClasses();
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [actionFilter, setActionFilter] = useState('all');
    const [classFilter, setClassFilter] = useState('all');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedActivity, setSelectedActivity] = useState(null);

    const activities = useMemo(() => buildActivities(students, teachers, classes), [students, teachers, classes]);
    const actionOptions = useMemo(() => [...new Set(activities.map((activity) => activity.action))], [activities]);
    const classOptions = useMemo(() => [...new Set(classes.map((classroom) => classroom.name).filter(Boolean))], [classes]);
    const loading = studentsLoading || teachersLoading || classesLoading;
    const hasError = studentsError || teachersError || classesError;
    const query = searchTerm.trim().toLowerCase();

    const visibleActivities = activities.filter((activity) => {
        const matchesSearch = !query || [activity.name, activity.action, activity.actor, activity.email]
            .some((value) => String(value).toLowerCase().includes(query));
        const matchesType = typeFilter === 'all' || activity.type === typeFilter;
        const matchesAction = actionFilter === 'all' || activity.action === actionFilter;
        const matchesClass = classFilter === 'all' || activity.target === classFilter || (activity.type === 'class' && activity.name === classFilter);
        const activityTime = activity.createdAt ? new Date(activity.createdAt).getTime() : NaN;
        const matchesFrom = !fromDate || (Number.isFinite(activityTime) && activityTime >= new Date(`${fromDate}T00:00:00`).getTime());
        const matchesTo = !toDate || (Number.isFinite(activityTime) && activityTime <= new Date(`${toDate}T23:59:59.999`).getTime());
        return matchesSearch && matchesType && matchesAction && matchesClass && matchesFrom && matchesTo;
    });

    return (
        <div className="activity-log-container">
            <section className="activity-log-header">
                <div>
                    <p className="activity-log-eyebrow">School Admin</p>
                    <h1>Activity log</h1>
                    <p>Search and review the latest student and teacher records across your school.</p>
                </div>
                <Link className="activity-log-back-link" to="/principal">Back to dashboard</Link>
            </section>

            <div className="activity-log-notice" role="note">
                This is a current-data activity view. Historical changes and real actors will appear when backend audit events are available.
            </div>

            <section className="activity-log-panel">
                <div className="activity-log-toolbar">
                    <input
                        className="activity-log-search"
                        type="search"
                        value={searchTerm}
                        placeholder="Search name, action, email, or actor"
                        onChange={(event) => setSearchTerm(event.target.value)}
                        aria-label="Search activity log"
                    />
                    <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} aria-label="Filter by record type">
                        <option value="all">All record types</option>
                        <option value="student">Students</option>
                        <option value="teacher">Teachers</option>
                        <option value="class">Classes</option>
                        <option value="enrollment">Enrollments</option>
                        <option value="assignment">Assignments</option>
                    </select>
                    <select value={actionFilter} onChange={(event) => setActionFilter(event.target.value)} aria-label="Filter by action">
                        <option value="all">All actions</option>
                        {actionOptions.map((action) => <option key={action} value={action}>{action}</option>)}
                    </select>
                    <select value={classFilter} onChange={(event) => setClassFilter(event.target.value)} aria-label="Filter by class">
                        <option value="all">All classes</option>
                        {classOptions.map((className) => <option key={className} value={className}>{className}</option>)}
                    </select>
                    <label className="activity-log-date-filter">From <input type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} /></label>
                    <label className="activity-log-date-filter">To <input type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} /></label>
                </div>

                <div className="activity-log-summary">
                    <strong>{visibleActivities.length} {visibleActivities.length === 1 ? 'activity' : 'activities'}</strong>
                    <span>Sorted newest first</span>
                </div>

                {hasError && <div className="activity-log-state activity-log-state--error" role="status">Some activity data could not be loaded.</div>}
                {loading && <div className="activity-log-state">Loading activity...</div>}
                {!loading && visibleActivities.length === 0 && <div className="activity-log-state">No activity matches these filters.</div>}

                {!loading && visibleActivities.length > 0 && (
                    <div className="activity-log-table-wrap">
                        <table className="activity-log-table">
                            <thead>
                                <tr>
                                    <th scope="col">Record</th>
                                    <th scope="col">Action</th>
                                    <th scope="col">Target</th>
                                    <th scope="col">Performed by</th>
                                    <th scope="col">Date and time</th>
                                    <th scope="col"><span className="sr-only">Details</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {visibleActivities.map((activity) => (
                                    <tr key={activity.id}>
                                        <td>
                                            <div className="activity-log-record">
                                                <span className={`activity-log-icon activity-log-icon--${activity.type}`} aria-hidden="true"><ActivityIcon type={activity.type} /></span>
                                                <span><strong>{activity.name}</strong><small>{activity.type}</small></span>
                                            </div>
                                        </td>
                                        <td>{activity.action}</td>
                                        <td>{activity.target || '—'}</td>
                                        <td>{activity.actor}</td>
                                        <td><time dateTime={activity.createdAt || undefined}>{formatActivityDate(activity.createdAt)}</time></td>
                                        <td><button className="activity-log-details" type="button" onClick={() => setSelectedActivity(activity)}>Details</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            {selectedActivity && (
                <div className="activity-log-dialog-backdrop" role="presentation" onClick={() => setSelectedActivity(null)}>
                    <section className="activity-log-dialog" role="dialog" aria-modal="true" aria-labelledby="activity-details-title" onClick={(event) => event.stopPropagation()}>
                        <div className="activity-log-dialog-header">
                            <div>
                                <p className="activity-log-eyebrow">Audit details</p>
                                <h2 id="activity-details-title">{selectedActivity.action}</h2>
                            </div>
                            <button className="activity-log-close" type="button" onClick={() => setSelectedActivity(null)} aria-label="Close activity details">Close</button>
                        </div>
                        <dl className="activity-log-details-list">
                            <div><dt>Record</dt><dd>{selectedActivity.name}</dd></div>
                            <div><dt>Type</dt><dd>{selectedActivity.type}</dd></div>
                            <div><dt>Target</dt><dd>{selectedActivity.target || 'Not applicable'}</dd></div>
                            <div><dt>Performed by</dt><dd>{selectedActivity.actor}</dd></div>
                            <div><dt>Date and time</dt><dd>{formatActivityDate(selectedActivity.createdAt)}</dd></div>
                            <div><dt>Record ID</dt><dd>{selectedActivity.details.id}</dd></div>
                            <div><dt>Email</dt><dd>{selectedActivity.details.email}</dd></div>
                            <div><dt>Status</dt><dd>{selectedActivity.details.status}</dd></div>
                            <div><dt>Target ID</dt><dd>{selectedActivity.details.targetId}</dd></div>
                        </dl>
                    </section>
                </div>
            )}
        </div>
    );
};

export default ActivityLog;
