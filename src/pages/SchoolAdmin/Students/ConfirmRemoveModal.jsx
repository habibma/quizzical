import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";

const ConfirmRemoveModal = ({ isOpen, studentName, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <Modal onClose={onClose} isOpen={isOpen} customClass="confirm-modal">
            <div className="confirm-modal__header">
                <h2>Remove Student</h2>
            </div>

            <p className="confirm-modal__message">
                Are you sure you want to remove <strong>{studentName}</strong> from the student list?
            </p>

            <div className="modal-actions">
                <Button
                    className="btn-secondary"
                    text="Cancel"
                    type="button"
                    onClick={onClose}
                />
                <Button
                    className="btn-danger"
                    text="Remove"
                    type="button"
                    onClick={onConfirm}
                />
            </div>
        </Modal>
    );
};

export default ConfirmRemoveModal;