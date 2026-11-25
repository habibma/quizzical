import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useClasses } from '../../../context/SchoolAdmin/ClassesContext';
import { useStudents } from '../../../context/SchoolAdmin/StudentsContext';
import { useTeachers } from '../../../context/SchoolAdmin/TeachersContext';
import { buildActivities } from './activityUtils';
import ActivityDetailsDialog from './ActivityDetailsDialog';
import ActivityTable from './ActivityTable';
import ActivityToolbar from './ActivityToolbar';
import AdminPageHeader from '../../../components/ui/AdminPageHeader/AdminPageHeader';
import PageState from '../../../components/ui/PageState/PageState';
import './ActivityLog.css';

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
            <AdminPageHeader
                eyebrow="School Admin"
                title="Activity log"
                description="Search and review the latest student and teacher records across your school."
                actions={<Link className="activity-log-back-link" to="/principal">Back to dashboard</Link>}
                classNames={{
                    root: 'activity-log-header',
                    eyebrow: 'activity-log-eyebrow',
                }}
            />

            <div className="activity-log-notice" role="note">
                This is a current-data activity view. Historical changes and real actors will appear when backend audit events are available.
            </div>

            <section className="activity-log-panel">
                <ActivityToolbar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    typeFilter={typeFilter}
                    onTypeChange={setTypeFilter}
                    actionFilter={actionFilter}
                    onActionChange={setActionFilter}
                    actionOptions={actionOptions}
                    classFilter={classFilter}
                    onClassChange={setClassFilter}
                    classOptions={classOptions}
                    fromDate={fromDate}
                    onFromDateChange={setFromDate}
                    toDate={toDate}
                    onToDateChange={setToDate}
                />

                <div className="activity-log-summary">
                    <strong>{visibleActivities.length} {visibleActivities.length === 1 ? 'activity' : 'activities'}</strong>
                    <span>Sorted newest first</span>
                </div>

                {hasError && <PageState className="activity-log-state" variant="error" role="status" message="Some activity data could not be loaded." />}
                {loading && <PageState className="activity-log-state" variant="loading" message="Loading activity..." />}
                {!loading && visibleActivities.length === 0 && <PageState className="activity-log-state" message="No activity matches these filters." />}

                {!loading && visibleActivities.length > 0 && (
                    <ActivityTable activities={visibleActivities} onViewDetails={setSelectedActivity} />
                )}
            </section>

            <ActivityDetailsDialog activity={selectedActivity} onClose={() => setSelectedActivity(null)} />
        </div>
    );
};

export default ActivityLog;
