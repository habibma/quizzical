import Modal from '../../../components/Modal.jsx';

const CategoryModal = ({ isOpen, onClose, list, repoId, onToggleCategory }) => {

  if (!isOpen) return null;

  return (
    <Modal customClass="repos-category-modal" isOpen={isOpen} onClose={onClose}>
      <h3>Categories</h3>
      {list.length > 0 ? (
        <table className="category-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map(item => (
              <tr key={item.id}>
                <td>{item.displayName}</td>
                <td>{item.enabled ? "Enabled" : "Disabled"}</td>
                <td>
                  <button onClick={() => onToggleCategory(repoId, item.id)}>
                    {item.enabled ? "Disable" : "Enable"}
                  </button>
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
