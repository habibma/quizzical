import { useState, useMemo } from "react";
import { useApi } from "../../../context/Admin/ApiContext.jsx";

import ConfirmDialog from "../../../components/ui/ConfirmDialog/ConfirmDialog";
import ApiModal from "./ApiModal";
import ApiHeader from "./ApiHeader";
import ApiSummary from "./ApiSummary";
import ApiToolbar from "./ApiToolbar";
import ApiTable from "./ApiTable";
import SuggestedApis from "./SuggestedApis";
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

  const handleEditApi = (api) => {
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

  const handleAddSuggestedApi = (api) => {
    addApi({ ...api, id: Date.now().toString() });
  };

  const stats = {
    total: apis.length,
    enabled: apis.filter(api => api.enabled).length,
    healthy: apis.filter(api => getHealthStatus(api).label === 'Healthy').length,
    offline: apis.filter(api => getHealthStatus(api).label === 'Offline').length,
  };

  return (
    <div className="api-container">
      <ApiHeader onAddApi={handleAddApi} />
      <ApiSummary {...stats} />
      <ApiToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />
      <ApiTable
        apis={filteredApis}
        getHealthStatus={getHealthStatus}
        onEdit={handleEditApi}
        onDelete={handleDeleteApi}
      />

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

      <SuggestedApis apis={apiSources} onAddApi={handleAddSuggestedApi} />

      <footer className="api-footer">
        <p>Quizical &copy; 2024 | in progress...</p>
      </footer>
    </div>
  );
};

export default Api