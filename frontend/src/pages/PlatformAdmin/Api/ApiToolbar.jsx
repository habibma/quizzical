import Input from "../../../components/ui/Input";

const STATUS_OPTIONS = [
    { value: "all", label: "All" },
    { value: "healthy", label: "Healthy" },
    { value: "warning", label: "Warning" },
    { value: "offline", label: "Offline" },
    { value: "enabled", label: "Enabled" },
    { value: "disabled", label: "Disabled" },
];

const ApiToolbar = ({ searchTerm, onSearchChange, statusFilter, onStatusChange }) => (
    <section className="api-toolbar">
        <div className="api-toolbar--search">
            <Input
                label="Search APIs"
                id="api-search"
                name="api-search"
                type="search"
                value={searchTerm}
                onChange={event => onSearchChange(event.target.value)}
                placeholder="Search by name, adaptor, or URL"
            />
        </div>
        <div className="api-toolbar--filter">
            <Input
                as="select"
                label="Filter"
                id="api-status-filter"
                name="api-status-filter"
                value={statusFilter}
                options={STATUS_OPTIONS}
                onChange={event => onStatusChange(event.target.value)}
            />
        </div>
    </section>
);

export default ApiToolbar;
