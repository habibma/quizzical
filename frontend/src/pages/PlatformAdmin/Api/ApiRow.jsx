import Button from "../../../components/ui/Button/Button";
import EditIcon from "../../../assets/icons/EditIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";

const ApiRow = ({ api, healthStatus, onEdit, onDelete }) => (
    <tr>
        <td className="api-table__name">{api.name}</td>
        <td>{api.adaptor}</td>
        <td>
            <span className={`status-badge ${api.enabled ? "status-badge--enabled" : "status-badge--disabled"}`}>
                {api.enabled ? "Enabled" : "Disabled"}
            </span>
        </td>
        <td>
            <span className={`health-badge ${healthStatus.className}`}>
                {healthStatus.label}
            </span>
        </td>
        <td>
            <span className={`status-badge ${api.isDefault ? "status-badge--default" : "status-badge--muted"}`}>
                {api.isDefault ? "Default" : "Optional"}
            </span>
        </td>
        <td>
            <ul className="api-endpoints-list">
                {api.endpoints.map(endpoint => (
                    <li key={endpoint.id}>
                        {endpoint.name} <span>({endpoint.method})</span>
                    </li>
                ))}
            </ul>
        </td>
        <td className="api-table--actions">
            <Button
                type="button"
                className="btn-secondary action-btn"
                onClick={onEdit}
                title={`Edit ${api.name}`}
                aria-label={`Edit ${api.name}`}
            >
                <EditIcon />
            </Button>
            <Button
                type="button"
                className="btn-danger action-btn"
                onClick={onDelete}
                title={`Delete ${api.name}`}
                aria-label={`Delete ${api.name}`}
            >
                <DeleteIcon />
            </Button>
        </td>
    </tr>
);

export default ApiRow;
