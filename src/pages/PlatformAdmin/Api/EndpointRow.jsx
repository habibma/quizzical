import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

const EndpointRow = ({ index, endpoint, onChange, onRemove, onConnect, isConnected, error }) => {

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onChange(index, name, value);
    }

    return (
        <div className="api-form-endpoint">
            <Input
                label={`Endpoint ${index + 1} Name`}
                id={`endpoint-${index}-name`}
                name="name"
                value={endpoint.name || ''}
                onChange={handleInputChange}
            />
            <Input
                as ="select"
                options={[
                    { value: "GET", label: "GET" },
                    { value: "POST", label: "POST" },
                    { value: "PUT", label: "PUT" },
                    { value: "DELETE", label: "DELETE" }
                ]}
                label={`Endpoint ${index + 1} Method`}
                id={`endpoint-${index}-method`}
                name="method"
                value={endpoint.method || ''}
                onChange={handleInputChange}
            />
            <Input
                label={`Endpoint ${index + 1} Path`}
                id={`endpoint-${index}-path`}
                name="path"
                value={endpoint.path || ''}
                onChange={handleInputChange}
            />
            <Input
                label={`Endpoint ${index + 1} Description`}
                id={`endpoint-${index}-description`}
                name="description"
                value={endpoint.description || ''}
                onChange={handleInputChange}
            />
            <Button className="btn-danger remove-endpoint" text="Remove" onClick={() => onRemove(index)} />
            <Button className="btn-success connect-endpoint" text="Test Connection" onClick={() => onConnect(endpoint)} />
            {error && <p className="connection-error">{error}</p>}
            {isConnected && <p className="connection-success">Connection successful!</p>}
        </div>
    );
};

export default EndpointRow;