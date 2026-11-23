import Button from '../../../components/ui/Button/Button';

import { useNavigate } from 'react-router-dom';

const StudentItem = ({
    id,
    name,
    class_id,
    className,
    email,
    profilePic,
    status,
    isSelected,
    onSelect,
    onEdit,
    onRemove,
}) => {
    const navigate = useNavigate();
    const initials = name?.charAt(0).toUpperCase() || '?';

    const handleOpenProfile = () => {
        if (!id) return;
        navigate(`/principal/students/${id}`);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleOpenProfile();
        }
    };

    return (
        <article
            className={`student-item ${isSelected ? 'student-item--selected' : ''}`}
            onClick={handleOpenProfile}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`Open details for ${name}`}
        >
            <div className="student-item__identity">
                {profilePic ? (
                    <img
                        src={profilePic}
                        alt={`${name}'s profile`}
                        className="student-item--profile-pic"
                    />
                ) : (
                    <div className="student-item--profile-placeholder">
                        {initials}
                    </div>
                )}

                <div className="student-item--info">
                    <div className="student-item--topline">
                        <h3 className="student-item--name">{name}</h3>
                        <span className="student-item--class">{className || class_id || 'Unassigned'}</span>
                    </div>
                    <p className="student-item--email">{email || 'No email provided'}</p>
                </div>
            </div>

            <div className="student-item__meta">
                <span className="student-item--class">{className || class_id || 'Unassigned'}</span>
            </div>

            <div className="student-item__status">
                <span className={`status-badge status-badge--${(status || 'active').toLowerCase().replace(/\s+/g, '-')}`}>
                    {status || 'Active'}
                </span>
            </div>

            <div className="student-item__actions" onClick={(event) => event.stopPropagation()}>
                <Button
                    className="student-item--edit"
                    onClick={() => onEdit && onEdit()}
                    aria-label={`Edit ${name}`}
                    title={`Edit ${name}`}
                    text="Edit"
                />
                <Button
                    className="student-item--remove"
                    onClick={() => onRemove && onRemove()}
                    aria-label={`Remove ${name}`}
                    title={`Remove ${name}`}
                    text="×"
                />
            </div>
        </article>
    );
};

export default StudentItem;