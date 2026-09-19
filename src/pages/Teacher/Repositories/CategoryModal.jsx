import Modal from '../../../components/ui/Modal';

const CategoryModal = ({ isOpen, onClose, list, repoId, onToggleCategory, loading, error, onRetry }) => {

  if (!isOpen) return null;

  return (
    <Modal customClass="repos-category-modal" isOpen={isOpen} onClose={onClose}>
      <h3>Categories</h3>
      {loading ? (
        <p className="repository-modal-state">Loading categories...</p>
      ) : error ? (
        <div className="repository-modal-state repository-modal-state--error">
          <p>{error}</p>
          <button type="button" className="btn-secondary" onClick={onRetry}>Retry</button>
        </div>
      ) : list.length > 0 ? (
        <table className="category-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {list.map(item => (
              <tr key={item.id}>
                <td>{item.displayName}</td>
                <td>
                  <td>
                    <span className={item.enabled ? "status-enabled" : "status-disabled"}>
                      {item.enabled ? "Available" : "Unavailable"}
                    </span>
                  </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (<p>No categories available.</p>)}
    </Modal>
  )
}

export default CategoryModal;
