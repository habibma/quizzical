import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';

const ConfirmQuestionDialog = ({ isOpen, title, message, onConfirm, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} customClass="question-confirm-modal">
    <div className="question-confirm">
      <h2>{title}</h2>
      <p>{message}</p>
      <div className="question-confirm__actions">
        <Button className="btn-secondary" text="Cancel" onClick={onClose} />
        <Button className="btn-danger" text="Delete" onClick={onConfirm} />
      </div>
    </div>
  </Modal>
);

export default ConfirmQuestionDialog;