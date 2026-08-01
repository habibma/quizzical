import { useState, useEffect } from "react";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import EditIcon from "../../../assets/icons/EditIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import './Api.css'

const apiSources = [
  {
    id: 1,
    name: "Open Trivia DB",
    baseUrl: "https://opentdb.com",
    enabled: true,
    isDefault: true,
    version: "v1",
    authentication: "none", // none | apiKey | bearer | basic
    authDetails: {
      apiKey: null,
    },
    endpoints: [
      {
        id: 1,
        name: "Get Categories",
        method: "GET",
        path: "/api_category.php",
        description: "Retrieve all available categories",
      },
      {
        id: 2,
        name: "Get Questions",
        method: "GET",
        path: "/api.php",
        description: "Retrieve trivia questions",
      },
    ],
  },
];

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

const ApiModal = ({ isOpen, onClose, apiSource, isEditing }) => {
  if (!isOpen) return null;

  const [apiData, setApiData] = useState(INITIAL_API_DATA);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApiData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    if (isEditing && apiSource) {
      setApiData(apiSource);
    }
  }, [isEditing, apiSource]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <header className="api-modal-header">
        <h2>{isEditing ? "Edit" : "Add"} API</h2>
      </header>
      <form className="api-form">
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
        <Input
          as="select"
          label="Authentication"
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
            onChange={handleInputChange}
          />
        )}
      </form>
    </Modal>
  );
};

const Api = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const hanldeEditApi = (apiSource) => {
    console.log("Editing API:", apiSource);
    setIsEditing(true);
    setIsModalOpen(true);
  }

  const handleAddApi = () => {
    setIsEditing(false);
    setIsModalOpen(true);
  }

  const handleDeleteApi = (apiSource) => {
    console.log("Deleting API:", apiSource);
  }

  return (
    <div className="api-container">
      <section className="api-header">
        <h1>APIs</h1>
        <p className="lead">Add, Remove, Update and Retrieve API endpoints!</p>
      </section>
      <section className="api-table-container">
        <table className="api-table">
          <thead className="api-table--header">
            <tr>
              <th>Name</th>
              <th>Base URL</th>
              <th>Enabled</th>
              <th>Default</th>
              <th>Version</th>
              <th>Authentication</th>
              <th>Endpoints</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="api-table--body">
            {apiSources.map((api) => (
              <tr key={api.id}>
                <td>{api.name}</td>
                <td>{api.baseUrl}</td>
                <td>{api.enabled ? "Yes" : "No"}</td>
                <td>{api.isDefault ? "Yes" : "No"}</td>
                <td>{api.version}</td>
                <td>{api.authentication}</td>
                <td>
                  <ul>
                    {api.endpoints.map((endpoint) => (
                      <li key={endpoint.id}>
                        {endpoint.name} ({endpoint.method})
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="api-table--actions">
                  <Button
                    className="btn-secondary action-btn"
                    text={<EditIcon />}
                    onClick={() => hanldeEditApi(api)}
                  />
                  <Button
                    className="btn-danger action-btn"
                    text={<DeleteIcon />}
                    onClick={() => handleDeleteApi(api)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <ApiModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} apiSource={apiSources[0]} isEditing={isEditing} />
      <section>
        <Button className="btn-primary" text="Add API" onClick={handleAddApi} />
      </section>
      <footer className="api-footer">
        <p>Quizical &copy; 2024 | in progress...</p>
      </footer>
    </div>
  );
}

export default Api