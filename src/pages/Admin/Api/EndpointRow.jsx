import Input from "../../../components/Input";
import Button from "../../../components/Button";

const EndpointRow = ({ index, endpoint, onChange, onRemove }) => {

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
        </div>
    );
};

export default EndpointRow;