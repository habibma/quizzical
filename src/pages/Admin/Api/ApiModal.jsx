import { useState, useEffect } from "react";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import EndpointRow from "./EndpointRow";
import './Api.css'

const INITIAL_API_DATA = {
    id: null,
    name: '',
    baseUrl: '',
    enabled: true,
    isDefault: false,
    version: '',
    authentication: 'none',
    authDetails: {
        apiKey: null,
    },
    endpoints: [],
};

const ApiModal = ({ isOpen, onClose, apiSource, isEditing, onSubmit }) => {

    const [apiData, setApiData] = useState(INITIAL_API_DATA);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setApiData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAuthChange = (e) => {
        const { name, value } = e.target;
        setApiData(prevData => ({
            ...prevData,
            authDetails: {
                ...prevData.authDetails,
                [name]: value
            }
        }));
    };

    const handleEndpointChange = (index, field, value) => {
        setApiData(prev => ({
            ...prev,
            endpoints: prev.endpoints.map((ep, i) =>
                i === index ? { ...ep, [field]: value } : ep
            )
        }));
    };

    const removeEndpoint = (index) => {
        const updatedEndpoints = apiData.endpoints.filter((_, i) => i !== index);
        setApiData(prevData => ({
            ...prevData,
            endpoints: updatedEndpoints
        }));
    };

    const addEndpoint = () => {
        setApiData(prevData => ({
            ...prevData,
            endpoints: [...prevData.endpoints, { name: '', method: '', path: '', description: '' }]
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(apiData);
        setApiData(INITIAL_API_DATA);
        onClose();
    }

    useEffect(() => {
        if (isEditing && apiSource) {
            setApiData(structuredClone(apiSource));
        }
        else {
            setApiData(INITIAL_API_DATA);
        }
    }, [isEditing, apiSource]);

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <header className="api-modal-header">
                <h2>{isEditing ? "Edit" : "Add"} API</h2>
            </header>
            <form className="api-form" onSubmit={handleSubmit}>
                <fieldset className="api-form-general">
                    <legend>General Information</legend>
                    <Input
                        label="Name"
                        id="name"
                        name="name"
                        value={apiData?.name || ''}
                        onChange={handleInputChange}
                    />
                    <Input
                        label="Base URL"
                        id="baseUrl"
                        name="baseUrl"
                        value={apiData?.baseUrl || ''}
                        onChange={handleInputChange}
                    />
                    <Input
                        label="Version"
                        id="version"
                        name="version"
                        value={apiData?.version || ''}
                        onChange={handleInputChange}
                    />
                </fieldset>
                <fieldset className="api-form-checkboxes">
                    <Input
                        type="checkbox"
                        label="Enabled"
                        id="enabled"
                        name="enabled"
                        checked={apiData?.enabled || false}
                        onChange={handleInputChange}
                    />
                    <Input
                        type="checkbox"
                        label="Default"
                        id="isDefault"
                        name="isDefault"
                        checked={apiData?.isDefault || false}
                        onChange={handleInputChange}
                    />
                </fieldset>
                <fieldset className="api-form-authentication">
                    <legend>Authentication</legend>
                    <Input
                        as="select"
                        label="Authentication Type"
                        id="authentication"
                        name="authentication"
                        value={apiData?.authentication || 'none'}
                        options={[
                            { value: "none", label: "None" },
                            { value: "apiKey", label: "API Key" },
                            { value: "bearer", label: "Bearer Token" },
                            // { value: "basic", label: "Basic Auth" },
                            // { value: "oauth2", label: "OAuth 2.0" },
                        ]}
                        onChange={handleInputChange}
                    />
                    {apiData.authentication === "apiKey" && (
                        <Input
                            label="API Key"
                            id="apiKey"
                            name="apiKey"
                            value={apiData?.authDetails?.apiKey || ''}
                            onChange={handleAuthChange}
                        />
                    )}
                </fieldset>
                <fieldset className="api-form-endpoints">
                    <legend>Endpoints</legend>
                    {apiData.endpoints.map((endpoint, index) => (
                        <EndpointRow
                            key={index}
                            index={index}
                            endpoint={endpoint}
                            onChange={handleEndpointChange}
                            onRemove={removeEndpoint}
                        />
                    ))}
                    <Button type="button" className="btn-primary" text="Add Endpoint" onClick={addEndpoint} />
                </fieldset>
                <div className="api-form-actions">
                    <Button type="submit" className="btn-primary" text={isEditing ? "Update API" : "Add API"} />
                    <Button className="btn-secondary" text="Cancel" onClick={onClose} />
                </div>
            </form>
        </Modal>
    );
};

export default ApiModal;
