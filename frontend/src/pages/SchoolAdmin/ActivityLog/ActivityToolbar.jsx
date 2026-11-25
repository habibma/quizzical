import SearchInput from '../../../components/ui/SearchInput/SearchInput';

const ActivityToolbar = ({
    searchTerm,
    onSearchChange,
    typeFilter,
    onTypeChange,
    actionFilter,
    onActionChange,
    actionOptions,
    classFilter,
    onClassChange,
    classOptions,
    fromDate,
    onFromDateChange,
    toDate,
    onToDateChange,
}) => (
    <div className="activity-log-toolbar">
        <SearchInput
            className="activity-log-search"
            value={searchTerm}
            placeholder="Search name, action, email, or actor"
            onChange={(event) => onSearchChange(event.target.value)}
            ariaLabel="Search activity log"
        />
        <select value={typeFilter} onChange={(event) => onTypeChange(event.target.value)} aria-label="Filter by record type">
            <option value="all">All record types</option>
            <option value="student">Students</option>
            <option value="teacher">Teachers</option>
            <option value="class">Classes</option>
            <option value="enrollment">Enrollments</option>
            <option value="assignment">Assignments</option>
        </select>
        <select value={actionFilter} onChange={(event) => onActionChange(event.target.value)} aria-label="Filter by action">
            <option value="all">All actions</option>
            {actionOptions.map((action) => <option key={action} value={action}>{action}</option>)}
        </select>
        <select value={classFilter} onChange={(event) => onClassChange(event.target.value)} aria-label="Filter by class">
            <option value="all">All classes</option>
            {classOptions.map((className) => <option key={className} value={className}>{className}</option>)}
        </select>
        <label className="activity-log-date-filter">
            From <input type="date" value={fromDate} onChange={(event) => onFromDateChange(event.target.value)} />
        </label>
        <label className="activity-log-date-filter">
            To <input type="date" value={toDate} onChange={(event) => onToDateChange(event.target.value)} />
        </label>
    </div>
);

export default ActivityToolbar;
