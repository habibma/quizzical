import Button from '../../../components/ui/Button/Button';

const TeacherItem = ({ teacher, onView, onEdit, onRemove }) => {
    const initials = teacher.name?.charAt(0).toUpperCase() || '?';
    const statusClass = (teacher.status || 'active').toLowerCase().replace(/\s+/g, '-');
    const assignedClasses = (teacher.classes_assigned || [])
        .map((assignedClass) => typeof assignedClass === 'string' ? assignedClass : assignedClass.name)
        .filter(Boolean);

    return (
        <div className="teacher-item">
            <div className="teacher-item__identity">
                {teacher.profilePic ? (
                    <img
                        src={teacher.profilePic}
                        alt={`${teacher.name}'s profile`}
                        className="teacher-item--profile-pic"
                    />
                ) : (
                    <div className="teacher-item--profile-placeholder">
                        {initials}
                    </div>
                )}

                <div className="teacher-item--info">
                    <h3 className="teacher-item--name">{teacher.name}</h3>
                    <p className="teacher-item--email">{teacher.email}</p>
                </div>
            </div>

            <div>
                <p className="teacher-item--classes">
                    {assignedClasses.join(', ') || 'No classes assigned'}
                </p>
            </div>

            <div>
                <span className={`status-badge status-badge--${statusClass}`}>
                    {teacher.status || 'active'}
                </span>
            </div>

            <div className="teacher-item__actions">
                <Button
                    className="teacher-item__view"
                    onClick={() => onView && onView(teacher)}
                    text="View"
                />
                <Button
                    className="teacher-item__edit"
                    onClick={() => onEdit && onEdit(teacher)}
                    text="Edit"
                />
                <Button
                    className="teacher-item__remove"
                    onClick={() => onRemove && onRemove(teacher)}
                    text="Remove"
                />
            </div>
        </div>
    );
};

export default TeacherItem;