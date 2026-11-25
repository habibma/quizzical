import { formatActivityDate } from './activityUtils';

const ActivityDetailsDialog = ({ activity, onClose }) => {
    if (!activity) return null;

    return (
        <div className="activity-log-dialog-backdrop" role="presentation" onClick={onClose}>
            <section
                className="activity-log-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="activity-details-title"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="activity-log-dialog-header">
                    <div>
                        <p className="activity-log-eyebrow">Audit details</p>
                        <h2 id="activity-details-title">{activity.action}</h2>
                    </div>
                    <button className="activity-log-close" type="button" onClick={onClose} aria-label="Close activity details">Close</button>
                </div>
                <dl className="activity-log-details-list">
                    <div><dt>Record</dt><dd>{activity.name}</dd></div>
                    <div><dt>Type</dt><dd>{activity.type}</dd></div>
                    <div><dt>Target</dt><dd>{activity.target || 'Not applicable'}</dd></div>
                    <div><dt>Performed by</dt><dd>{activity.actor}</dd></div>
                    <div><dt>Date and time</dt><dd>{formatActivityDate(activity.createdAt)}</dd></div>
                    <div><dt>Record ID</dt><dd>{activity.details.id}</dd></div>
                    <div><dt>Email</dt><dd>{activity.details.email}</dd></div>
                    <div><dt>Status</dt><dd>{activity.details.status}</dd></div>
                    <div><dt>Target ID</dt><dd>{activity.details.targetId}</dd></div>
                </dl>
            </section>
        </div>
    );
};

export default ActivityDetailsDialog;
