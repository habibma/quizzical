import { useState, useMemo } from "react";
import { useApi } from "../../../context/Admin/ApiContext.jsx";

import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import ConfirmDialog from "../../../components/ui/ConfirmDialog/ConfirmDialog";
import EditIcon from "../../../assets/icons/EditIcon";
import DeleteIcon from "../../../assets/icons/DeleteIcon";
import ApiModal from "./ApiModal";

import { apiSources } from "./sources.js";

import './Api.css'

const Api = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedApiSource, setSelectedApiSource] = useState(null);
  const [apiToDelete, setApiToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { apis, addApi, updateApi, removeApi } = useApi();

  const getHealthStatus = (api) => {
    if (!api.enabled) {
      return { label: 'Offline', className: 'health-badge--offline' };
    }

    if (!api.endpoints || api.endpoints.length === 0) {
      return { label: 'Warning', className: 'health-badge--warning' };
    }

    return { label: 'Healthy', className: 'health-badge--healthy' };
  };

  const filteredApis = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return apis.filter((api) => {
      const searchableText = [api.name, api.adaptor, api.baseUrl, api.provider]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);

      if (!matchesSearch) {
        return false;
      }

      if (statusFilter === 'all') {
        return true;
      }

      const healthStatus = getHealthStatus(api).label.toLowerCase();

      if (statusFilter === 'enabled') {
        return api.enabled;
      }

      if (statusFilter === 'disabled') {
        return !api.enabled;
      }

      return healthStatus === statusFilter;
    });
  }, [apis, searchTerm, statusFilter]);

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
    setApiToDelete(api);
  };

  const handleConfirmDelete = () => {
    if (apiToDelete) {
      removeApi(apiToDelete.id);
      setApiToDelete(null);
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
  const healthyApis = apis.filter((api) => getHealthStatus(api).label === 'Healthy').length;
  const offlineApis = apis.filter((api) => getHealthStatus(api).label === 'Offline').length;

  return (
    <div className="api-container">
      <section className="api-header">
        <div className="api-header--content">
          <p className="api-header--eyebrow">Platform Admin</p>
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
          <span>Healthy</span>
          <strong>{healthyApis}</strong>
        </div>
        <div className="api-summary-card">
          <span>Offline</span>
          <strong>{offlineApis}</strong>
        </div>
      </section>

      <section className="api-toolbar">
        <div className="api-toolbar__search">
          <label htmlFor="api-search">Search APIs</label>
          <input
            id="api-search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, adaptor, or URL"
          />
        </div>

        <div className="api-toolbar__filter">
          <label htmlFor="api-status-filter">Filter</label>
          <select id="api-status-filter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="healthy">Healthy</option>
            <option value="warning">Warning</option>
            <option value="offline">Offline</option>
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
      </section>

      <section className="api-table-container">
        <table className="api-table">
          <thead className="api-table--header">
            <tr>
              <th>Name</th>
              <th>Adaptor</th>
              <th>Status</th>
              <th>Health</th>
              <th>Default</th>
              <th>Endpoints</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="api-table--body">
            {filteredApis.length > 0 ? filteredApis.map((api) => {
              const healthStatus = getHealthStatus(api);

              return (
                <tr key={api.id}>
                  <td className="api-table__name">{api.name}</td>
                  <td>{api.adaptor}</td>
                  <td>
                    <span className={`status-badge ${api.enabled ? 'status-badge--enabled' : 'status-badge--disabled'}`}>
                      {api.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </td>
                  <td>
                    <span className={`health-badge ${healthStatus.className}`}>
                      {healthStatus.label}
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
              );
            }) : (
              <tr>
                <td colSpan="7" className="api-empty-state">
                  No APIs match the current search or filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <ApiModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        apiSource={selectedApiSource}
        isEditing={isEditing}
        onSubmit={handleSaveApi}
        customClass="api-modal"
      />

      <ConfirmDialog
        isOpen={Boolean(apiToDelete)}
        title="Delete API?"
        message={`Are you sure you want to delete ${apiToDelete?.name}? This action cannot be undone.`}
        confirmText="Delete API"
        cancelText="Keep API"
        onConfirm={handleConfirmDelete}
        onClose={() => setApiToDelete(null)}
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