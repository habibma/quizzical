import { useState, useEffect } from "react";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import EditIcon from "../../../assets/icons/EditIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import ApiModal from "./ApiModal";
import './Api.css'

const apiSources = [
  {
    id: 1,
    name: "Open Trivia DB",
    baseUrl: "https://opentdb.com",
    enabled: true,
    isDefault: true,
    version: "v1",
    authentication: "none", // none | apiKey | bearer
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

const Api = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [apiSourcesState, setApiSourcesState] = useState(apiSources);
  const [selectedApiSource, setSelectedApiSource] = useState(null);

  const hanldeEditApi = (apiSource) => {
    setSelectedApiSource(apiSource);
    setIsEditing(true);
    setIsModalOpen(true);
  }

  const handleAddApi = () => {
    setSelectedApiSource(null);
    setIsEditing(false);
    setIsModalOpen(true);
  }

  const handleDeleteApi = (apiSource) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the API: ${apiSource.name}?`);
    if (confirmDelete) {
      setApiSourcesState(prev => prev.filter(api => api.id !== apiSource.id));
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setSelectedApiSource(null);
  }

  const addApiSource = (apiData) => {
    setApiSourcesState(prev => [...prev, { ...apiData, id: Date.now().toString() }]);
  }

  const updateApiSource = (apiData) => {
    setApiSourcesState(prev => prev.map(api => api.id === apiData.id ? apiData : api));
  }

  const handleSaveApi = (apiData) => {
    if (isEditing) {
      updateApiSource(apiData);
    } else {
      addApiSource(apiData);
    }
    handleCloseModal();
  };

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
            {apiSourcesState.map((api) => (
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
      <ApiModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        apiSource={selectedApiSource}
        isEditing={isEditing}
        onSubmit={handleSaveApi}
      />
      <section>
        <Button className="btn-primary" text="Add API" onClick={handleAddApi} />
      </section>
      <footer className="api-footer">
        <p>Quizical &copy; 2024 | in progress...</p>
      </footer>
    </div>
  );
};

export default Api