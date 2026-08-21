import { useState, useEffect } from "react";

import Modal from "../../../components/ui/Modal";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
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
    const [isConnected, setIsConnected] = useState(false);
    const [connectionError, setConnectionError] = useState(null);

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

    // connection handlers
    const handleConnect = async (endpnt) => {
        setConnectionError(null);
        setIsConnected(false);
        try {
            if (!apiData.baseUrl.trim()) {
                throw new Error("Base URL is empty");
            }
            const headers = {};
            if (apiData.authentication === "bearer") {
                headers.Authorization = `Bearer ${apiData.authDetails.token}`;
            }
            if (apiData.authentication === "apiKey") {
                headers["X-API-Key"] = apiData.authDetails.apiKey;
            }
            const url = new URL(endpnt?.path || "", apiData.baseUrl).toString();
            const response = await fetch(url, {
                method: endpnt?.method || 'GET',
                headers: headers,
            });
            if (response.ok) {
                setIsConnected(true);
                setConnectionError(null);
            } else {
                throw new Error(`Connection failed with status: ${response.status}`);
            }
        } catch (error) {
            setConnectionError(error.message || "An error occurred while trying to connect");
        }
    };

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
                    <legend>Identity</legend>
                    <Input
                        label="Name"
                        id="name"
                        name="name"
                        value={apiData?.name || ''}
                        onChange={handleInputChange}
                    />
                    <Input
                        label="Description"
                        id="description"
                        name="description"
                        value={apiData?.description || ''}
                        onChange={handleInputChange}
                    />
                    <Input
                        label="provider"
                        id="provider"
                        name="provider"
                        value={apiData?.provider || ''}
                        onChange={handleInputChange}
                    />
                </fieldset>
                <fieldset className="api-form-connection">
                    <legend>Connection</legend>
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
                <fieldset className="api-form-capabilities">
                    <legend>Question capabilities</legend>
                    <div>
                        <Input
                            type="checkbox"
                            label="Supports multiple choice questions"
                            id="supportsMultipleChoice"
                            name="supportsMultipleChoice"
                            checked={apiData?.supportsMultipleChoice || false}
                            onChange={handleInputChange}
                        />
                        <Input
                            type="checkbox"
                            label="Supports true/false questions"
                            id="supportsTrueFalse"
                            name="supportsTrueFalse"
                            checked={apiData?.supportsTrueFalse || false}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Input
                            type="checkbox"
                            label="easy difficulty"
                            id="easyDifficulty"
                            name="easyDifficulty"
                            checked={apiData?.easyDifficulty || false}
                            onChange={handleInputChange}
                        />
                        <Input
                            type="checkbox"
                            label="medium difficulty"
                            id="mediumDifficulty"
                            name="mediumDifficulty"
                            checked={apiData?.mediumDifficulty || false}
                            onChange={handleInputChange}
                        />
                        <Input
                            type="checkbox"
                            label="hard difficulty"
                            id="hardDifficulty"
                            name="hardDifficulty"
                            checked={apiData?.hardDifficulty || false}
                            onChange={handleInputChange}
                        />
                    </div>
                </fieldset>
                <fieldset className="api-form-checkboxes">
                    <legend>Settings</legend>
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
                <fieldset className="api-form-endpoints">
                    <legend>Endpoints</legend>
                    {apiData.endpoints.map((endpoint, index) => (
                        <EndpointRow
                            key={index}
                            index={index}
                            endpoint={endpoint}
                            onChange={handleEndpointChange}
                            onRemove={removeEndpoint}
                            onConnect={handleConnect}
                            isConnected={isConnected}
                            error={connectionError}
                        />
                    ))}
                    <Button type="button" className="btn-primary" text="Add Endpoint" onClick={addEndpoint} />
                </fieldset>
                <fieldset className="api-form--adaptor-name">
                    <legend>Adaptor Name</legend>
                    {/* this name is used to identify the API adaptor. it should be unique. TODO: Add validation and error handling and info for users */}
                    <Input
                        type="text"
                        id="adaptor"
                        name="adaptor"
                        value={apiData?.adaptor || ""}
                        onChange={handleInputChange}
                    />
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
