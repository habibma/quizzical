import { useState, useEffect } from "react";
import { useApi } from "../../../context/Admin/ApiContext.jsx";

import Modal from "../../../components/ui/Modal";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import EditIcon from "../../../assets/icons/EditIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import ApiModal from "./ApiModal";

import { apiSources } from "./sources.js";

import './Api.css'

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


  const totalApis = apis.length;
  const enabledApis = apis.filter((api) => api.enabled).length;
  const defaultApis = apis.filter((api) => api.isDefault).length;

  return (
    <div className="api-container">
      <section className="api-header">
        <div className="api-header__content">
          <p className="api-header__eyebrow">Platform Admin</p>
          <h1>APIs</h1>
          <p className="lead">Manage and monitor your connected quiz providers.</p>
        </div>

        <div className="api-header__actions">
          <Button className="btn-primary" text="Add API" onClick={handleAddApi} />
        </div>
      </section>

      <section className="api-summary-grid">
        <div className="api-summary-card">
          <span>Total APIs</span>
          <strong>{totalApis}</strong>
        </div>
        <div className="api-summary-card">
          <span>Enabled</span>
          <strong>{enabledApis}</strong>
        </div>
        <div className="api-summary-card">
          <span>Default</span>
          <strong>{defaultApis}</strong>
        </div>
        <div className="api-summary-card">
          <span>Sources</span>
          <strong>2</strong>
        </div>
      </section>

      <section className="api-table-container">
        <table className="api-table">
          <thead className="api-table--header">
            <tr>
              <th>Name</th>
              <th>Adaptor</th>
              <th>Status</th>
              <th>Default</th>
              <th>Endpoints</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="api-table--body">
            {apis.map((api) => (
              <tr key={api.id}>
                <td className="api-table__name">{api.name}</td>
                <td>{api.adaptor}</td>
                <td>
                  <span className={`status-badge ${api.enabled ? 'status-badge--enabled' : 'status-badge--disabled'}`}>
                    {api.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${api.isDefault ? 'status-badge--default' : 'status-badge--muted'}`}>
                    {api.isDefault ? 'Default' : 'Optional'}
                  </span>
                </td>
                <td>
                  <ul className="api-endpoints-list">
                    {api.endpoints.map((endpoint) => (
                      <li key={endpoint.id}>
                        {endpoint.name} <span>({endpoint.method})</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="api-table--actions">
                  <Button
                    className="btn-secondary action-btn"
                    text={<EditIcon />}
                    onClick={() => hanldeEditApi(api)}
                    title="Edit API"
                  />
                  <Button
                    className="btn-danger action-btn"
                    text={<DeleteIcon />}
                    onClick={() => handleDeleteApi(api)}
                    title="Delete API"
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
      </section>

      <footer className="api-footer">
        <p>Quizical &copy; 2024 | in progress...</p>
      </footer>
    </div>
  );
};

export default Api