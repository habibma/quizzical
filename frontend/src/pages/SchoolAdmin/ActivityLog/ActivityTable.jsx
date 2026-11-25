import StudentIcon from '../../../assets/icons/StudentIcon';
import TeacherIcon from '../../../assets/icons/TeacherIcon';
import ClassroomIcon from '../../../assets/icons/ClassroomIcon';
import { formatActivityDate } from './activityUtils';

const ActivityIcon = ({ type }) => {
    const Icon = type === 'student' || type === 'enrollment' ? StudentIcon : type === 'teacher' || type === 'assignment' ? TeacherIcon : ClassroomIcon;
    return <Icon />;
};

const ActivityTable = ({ activities, onViewDetails }) => (
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
                {activities.map((activity) => (
                    <tr key={activity.id}>
                        <td>
                            <div className="activity-log-record">
                                <span className={`activity-log-icon activity-log-icon--${activity.type}`} aria-hidden="true">
                                    <ActivityIcon type={activity.type} />
                                </span>
                                <span><strong>{activity.name}</strong><small>{activity.type}</small></span>
                            </div>
                        </td>
                        <td>{activity.action}</td>
                        <td>{activity.target || '—'}</td>
                        <td>{activity.actor}</td>
                        <td><time dateTime={activity.createdAt || undefined}>{formatActivityDate(activity.createdAt)}</time></td>
                        <td><button className="activity-log-details" type="button" onClick={() => onViewDetails(activity)}>Details</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default ActivityTable;
