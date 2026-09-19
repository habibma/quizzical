import Button from '../../../components/ui/Button/Button';


import { useNavigate } from 'react-router-dom';

const StudentItem = ({ id, name, className, email, profilePic, grade, status, isSelected, onSelect, onRemove }) => {
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
                        {grade && <span className="student-item--grade">{grade}</span>}
                    </div>
                    <p className="student-item--email">{email || 'No email provided'}</p>
                </div>
            </div>

            <div className="student-item__meta">
                <span className="student-item--class">{className}</span>
            </div>

            <div className="student-item__status">
                <span className={`status-badge status-badge--${status.toLowerCase()}`}>
                    {status}
                </span>
            </div>

            <Button
                className="student-item--remove"
                onClick={(event) => {
                    event.stopPropagation();
                    onRemove();
                }}
                aria-label={`Remove ${name}`}
                title={`Remove ${name}`}
                text="×"
            >
            </Button>
        </article>
    );
};

export default StudentItem;