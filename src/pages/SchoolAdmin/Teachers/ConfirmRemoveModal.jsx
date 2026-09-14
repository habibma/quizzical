import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";

const ConfirmRemoveModal = ({ isOpen, teacherName, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <Modal onClose={onClose} isOpen={isOpen} customClass="confirm-modal">
            <div className="confirm-modal__header">
                <h2>Remove Teacher</h2>
            </div>
            <div className="confirm-modal__body">
                <p>Are you sure you want to remove {teacherName}?</p>
            </div>
            <div className="confirm-modal__footer">
                <Button className="btn-secondary" onClick={onClose} variant="secondary" text="Cancel" />
                <Button className="btn-danger" onClick={onConfirm} variant="danger" text="Remove" />
            </div>
        </Modal>
    );
};

export default ConfirmRemoveModal;