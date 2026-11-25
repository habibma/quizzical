
import { useState, useEffect } from "react";

import Modal from "../../../components/ui/Modal";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button/Button";
import EndpointRow from "./EndpointRow";

import "./Api.css";

const createInitialApiData = () => ({
    id: null,
    name: "",
    description: "",
    provider: "",
    baseUrl: "",
    enabled: true,
    isDefault: false,
    version: "",
    authentication: "none",
    authDetails: {
        apiKey: null,
        token: null,
    },
    adapter: {
        type: "generic-rest",
        version: 1,
    },
    endpoints: [],
});

const normalizeApiData = (api) => {
    if (!api) return createInitialApiData();

    return {
        ...createInitialApiData(),
        ...api,
        adapter: {
            type: "generic-rest",
            version: 1,
        },
        authDetails: {
            ...createInitialApiData().authDetails,
            ...api.authDetails,
        },
        endpoints: (api.endpoints || []).map((endpoint) => ({
            ...endpoint,
            id: endpoint.id || crypto.randomUUID(),
            type:
                endpoint.type ||
                (endpoint.name?.toLowerCase() === "categories"
                    ? "categories"
                    : endpoint.name?.toLowerCase() === "questions"
                      ? "questions"
                      : "other"),
            method: endpoint.method || "GET",
            path: endpoint.path || "",
            mapping: endpoint.mapping || {},
        })),
    };
};

const ApiModal = ({
    isOpen,
    onClose,
    apiSource,
    isEditing,
    onSubmit,
    customClass,
}) => {
    const [apiData, setApiData] = useState(createInitialApiData);
    const [connectionResults, setConnectionResults] = useState({});

    useEffect(() => {
        if (isOpen) {
            setApiData(
                isEditing && apiSource
                    ? normalizeApiData(apiSource)
                    : createInitialApiData()
            );
            setConnectionResults({});
        }
    }, [isOpen, isEditing, apiSource]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setApiData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleAuthChange = (e) => {
        const { name, value } = e.target;

        setApiData((prev) => ({
            ...prev,
            authDetails: {
                ...prev.authDetails,
                [name]: value,
            },
        }));
    };

    const handleEndpointChange = (index, field, value) => {
        setApiData((prev) => ({
            ...prev,
            endpoints: prev.endpoints.map((endpoint, i) =>
                i === index
                    ? { ...endpoint, [field]: value }
                    : endpoint
            ),
        }));
    };

    const handleMappingChange = (index, field, value) => {
        setApiData((prev) => ({
            ...prev,
            endpoints: prev.endpoints.map((endpoint, i) =>
                i === index
                    ? {
                          ...endpoint,
                          mapping: {
                              ...endpoint.mapping,
                              [field]: value,
                          },
                      }
                    : endpoint
            ),
        }));
    };

    const addEndpoint = (type) => {
        if (
            type !== "other" &&
            apiData.endpoints.some((endpoint) => endpoint.type === type)
        ) {
            return;
        }

        const names = {
            categories: "Categories",
            questions: "Questions",
            other: "Other",
        };

        setApiData((prev) => ({
            ...prev,
            endpoints: [
                ...prev.endpoints,
                {
                    id: crypto.randomUUID(),
                    name: names[type],
                    type,
                    method: "GET",
                    path: "",
                    description: "",
                    mapping: {},
                },
            ],
        }));
    };

    const removeEndpoint = (index) => {
        setApiData((prev) => ({
            ...prev,
            endpoints: prev.endpoints.filter((_, i) => i !== index),
        }));
    };

    const handleConnect = async (endpoint) => {
        const endpointId = endpoint.id;

        setConnectionResults((prev) => ({
            ...prev,
            [endpointId]: {
                loading: true,
                connected: false,
                error: null,
            },
        }));

        try {
            if (!apiData.baseUrl.trim()) {
                throw new Error("Base URL is required.");
            }

            if (!endpoint.path.trim()) {
                throw new Error("Endpoint path is required.");
            }

            const headers = {};

            if (apiData.authentication === "bearer") {
                if (!apiData.authDetails.token) {
                    throw new Error("Bearer token is required.");
                }

                headers.Authorization =
                    `Bearer ${apiData.authDetails.token}`;
            }

            if (apiData.authentication === "apiKey") {
                if (!apiData.authDetails.apiKey) {
                    throw new Error("API key is required.");
                }

                headers["X-API-Key"] = apiData.authDetails.apiKey;
            }

            const baseUrl = apiData.baseUrl.endsWith("/")
                ? apiData.baseUrl
                : `${apiData.baseUrl}/`;

            const path = endpoint.path.replace(/^\/+/, "");
            const url = new URL(path, baseUrl);

            const response = await fetch(url, {
                method: endpoint.method || "GET",
                headers,
            });

            if (!response.ok) {
                throw new Error(
                    `Request failed with status ${response.status}.`
                );
            }

            setConnectionResults((prev) => ({
                ...prev,
                [endpointId]: {
                    loading: false,
                    connected: true,
                    error: null,
                },
            }));
        } catch (error) {
            setConnectionResults((prev) => ({
                ...prev,
                [endpointId]: {
                    loading: false,
                    connected: false,
                    error:
                        error.message ||
                        "Unable to connect to this endpoint.",
                },
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const preparedApi = {
            ...apiData,
            adapter: {
                type: "generic-rest",
                version: 1,
            },
        };

        onSubmit(preparedApi);
    };

    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            customClass={customClass}
        >
            <header className="api-modal--header">
                <h2>{isEditing ? "Edit" : "Add"} API</h2>
            </header>

            <form
                className="api-modal--form"
                onSubmit={handleSubmit}
            >
                {/* Identity */}
                <fieldset className="form-fieldset api-form-general">
                    <legend>Identity</legend>

                    <Input
                        label="Name"
                        id="name"
                        name="name"
                        value={apiData.name}
                        onChange={handleInputChange}
                        required
                    />

                    <Input
                        label="Description"
                        id="description"
                        name="description"
                        value={apiData.description}
                        onChange={handleInputChange}
                    />

                    <Input
                        label="Provider"
                        id="provider"
                        name="provider"
                        value={apiData.provider}
                        onChange={handleInputChange}
                    />
                </fieldset>

                {/* Connection */}
                <fieldset className="form-fieldset api-form-connection">
                    <legend>Connection</legend>

                    <Input
                        label="Base URL"
                        id="baseUrl"
                        name="baseUrl"
                        value={apiData.baseUrl}
                        onChange={handleInputChange}
                        required
                    />

                    <Input
                        label="Version"
                        id="version"
                        name="version"
                        value={apiData.version}
                        onChange={handleInputChange}
                    />
                </fieldset>

                {/* Adapter */}
                <fieldset className="form-fieldset api-form-adapter">
                    <legend>Adapter Configuration</legend>

                    <p>
                        All APIs use Quizzical's Generic REST adapter.
                        Configure endpoints and response-field mappings
                        to integrate your API.
                    </p>
                </fieldset>

                {/* Authentication */}
                <fieldset className="form-fieldset api-form-authentication">
                    <legend>Authentication</legend>

                    <Input
                        as="select"
                        label="Authentication Type"
                        id="authentication"
                        name="authentication"
                        value={apiData.authentication}
                        options={[
                            { value: "none", label: "None" },
                            { value: "apiKey", label: "API Key" },
                            { value: "bearer", label: "Bearer Token" },
                        ]}
                        onChange={handleInputChange}
                    />

                    {apiData.authentication === "apiKey" && (
                        <Input
                            type="password"
                            label="API Key"
                            id="apiKey"
                            name="apiKey"
                            value={apiData.authDetails.apiKey || ""}
                            onChange={handleAuthChange}
                        />
                    )}

                    {apiData.authentication === "bearer" && (
                        <Input
                            type="password"
                            label="Bearer Token"
                            id="token"
                            name="token"
                            value={apiData.authDetails.token || ""}
                            onChange={handleAuthChange}
                        />
                    )}
                </fieldset>

                {/* Settings */}
                <fieldset className="form-fieldset api-form-checkboxes">
                    <legend>Settings</legend>

                    <Input
                        type="checkbox"
                        label="Enabled"
                        id="enabled"
                        name="enabled"
                        checked={apiData.enabled}
                        onChange={handleInputChange}
                    />

                    <Input
                        type="checkbox"
                        label="Default"
                        id="isDefault"
                        name="isDefault"
                        checked={apiData.isDefault}
                        onChange={handleInputChange}
                    />
                </fieldset>

                {/* Endpoints */}
                <fieldset className="form-fieldset api-form-endpoints">
                    <legend>Endpoints</legend>

                    {apiData.endpoints.map((endpoint, index) => (
                        <EndpointRow
                            key={endpoint.id}
                            index={index}
                            endpoint={endpoint}
                            onChange={handleEndpointChange}
                            onMappingChange={handleMappingChange}
                            onRemove={removeEndpoint}
                            onConnect={handleConnect}
                            connectionResult={connectionResults[endpoint.id]}
                        />
                    ))}

                    <div className="api-endpoint-actions">
                        <Button
                            type="button"
                            className="btn-primary"
                            text="Add Category Endpoint"
                            onClick={() => addEndpoint("categories")}
                        />

                        <Button
                            type="button"
                            className="btn-primary"
                            text="Add Question Endpoint"
                            onClick={() => addEndpoint("questions")}
                        />

                        <Button
                            type="button"
                            className="btn-secondary"
                            text="Add Other Endpoint"
                            onClick={() => addEndpoint("other")}
                        />
                    </div>
                </fieldset>

                {/* Actions */}
                <div className="api-form-actions">
                    <Button
                        type="submit"
                        className="btn-primary"
                        text={isEditing ? "Update API" : "Add API"}
                    />

                    <Button
                        type="button"
                        className="btn-secondary"
                        text="Cancel"
                        onClick={onClose}
                    />
                </div>
            </form>
        </Modal>
    );
};

export default ApiModal;
