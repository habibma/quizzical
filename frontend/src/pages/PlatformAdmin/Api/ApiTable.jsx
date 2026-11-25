import InfoTooltip from "../../../components/ui/InfoTooltip/InfoTooltip.jsx";
import ApiRow from "./ApiRow";

const ApiTable = ({ apis, getHealthStatus, onEdit, onDelete }) => (
    <section className="api-table-container">
        <table className="api-table">
            <thead className="api-table--header">
                <tr>
                    <th>Name</th>
                    <th>Adaptor</th>
                    <th>Status</th>
                    <th>
                        Health
                        <InfoTooltip content={"Healthy: enabled and has at least one endpoint\nWarning: enabled but no endpoint configured\nOffline: API is disabled"} />
                    </th>
                    <th>Default</th>
                    <th>Endpoints</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody className="api-table--body">
                {apis.length ? apis.map(api => (
                    <ApiRow
                        key={api.id}
                        api={api}
                        healthStatus={getHealthStatus(api)}
                        onEdit={() => onEdit(api)}
                        onDelete={() => onDelete(api)}
                    />
                )) : (
                    <tr>
                        <td colSpan="7" className="api-empty-state">
                            No APIs match the current search or filter.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </section>
);

export default ApiTable;
