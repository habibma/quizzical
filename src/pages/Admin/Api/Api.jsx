import { useState, useEffect } from "react";
import { useApi } from "../../../context/Admin/ApiContext.jsx";
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
        name: "Categories",
        method: "GET",
        path: "/api_category.php",
        description: "all available categories",
      },
      {
        id: 2,
        name: "Questions",
        method: "GET",
        path: "/api.php",
        description: "trivia questions",
      },
    ],
    difficulty: ["easy", "medium", "hard"],
    price: 0,
    adaptor: "opentdb",
  },
  {
    id: 2,
    name: "The Trivia API",
    baseUrl: "https://the-trivia-api.com/v2",
    enabled: true,
    isDefault: false,
    version: "v1",
    authentication: "none",
    authDetails: {
    apiKey: null,
    },
    endpoints: [
      {
        id: 1,
        name: "Categories",
        method: "GET",
        path: "/categories",
        description: "all available categories",
      },
      {
        id: 2,
        name: "Questions",
        method: "GET",
        path: "/api/questions",
        description: "trivia questions",
      },
    ],
    difficulty: ["easy", "medium", "hard"],
    price: 9.99,
    adaptor: "trivia-api",
  },
];

const Api = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedApiSource, setSelectedApiSource] = useState(null);
  const { apis, addApi, updateApi, removeApi } = useApi();

  const handleAddApi = () => {
    setSelectedApiSource(null);
    setIsEditing(false);
    setIsModalOpen(true);
  }

  const hanldeEditApi = (api) => {
    setSelectedApiSource(api);
    setIsEditing(true);
    setIsModalOpen(true);
  }

  const handleDeleteApi = (api) => {
    if (window.confirm(`Are you sure you want to delete the API: ${api.name}?`)) {
      removeApi(api.id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedApiSource(null);
    setIsEditing(false);
  }

  const handleSaveApi = (api) => {
    if (isEditing) {
      // Update existing API
      updateApi(api.id, api);
    } else {
      // Add new API
      addApi(api);
    }
    handleCloseModal();
  };

  const addOpenTDBApiSource = () => {
    addApi({ ...apiSources[0], id: Date.now().toString() });
  };

  const addTriviaApiSource = () => {
    addApi({ ...apiSources[1], id: Date.now().toString() });
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
              <th>Adaptor</th>
              <th>Enabled</th>
              <th>Default</th>
              <th>Endpoints</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="api-table--body">
            {apis.map((api) => (
              <tr key={api.id}>
                <td>{api.name}</td>
                <td>{api.adaptor}</td>
                <td>{api.enabled ? "Yes" : "No"}</td>
                <td>{api.isDefault ? "Yes" : "No"}</td>
                <td>
                  <ul className="api-endpoints-list">
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
      <section className="api-actions">
        <Button className="btn-primary" text="Add OpenTDB API" onClick={addOpenTDBApiSource} />
        <Button className="btn-primary" text="Add Trivia API" onClick={addTriviaApiSource} />
        <Button className="btn-primary" text="Add API" onClick={handleAddApi} />
      </section>
      <footer className="api-footer">
        <p>Quizical &copy; 2024 | in progress...</p>
      </footer>
    </div>
  );
};

export default Api