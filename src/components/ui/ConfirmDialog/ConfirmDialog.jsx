import { useId } from 'react';

import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button';

import './ConfirmDialog.css';

const ConfirmDialog = ({
    isOpen,
    title = 'Confirm Action',
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onClose,
    confirmClassName = 'btn-danger',
}) => {
    const titleId = useId();
    const messageId = useId();

    return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        customClass="confirm-modal"
        role="alertdialog"
        ariaLabelledBy={titleId}
        ariaDescribedBy={messageId}
    >
        <div className="confirm-dialog">
            <h2 id={titleId}>{title}</h2>
            <p id={messageId}>{message}</p>

            <div className="confirm-dialog--actions">
                <Button
                    className="btn-secondary"
                    text={cancelText}
                    onClick={onClose}
                />

                <Button
                    className={confirmClassName}
                    text={confirmText}
                    onClick={onConfirm}
                />
            </div>
        </div>
    </Modal>
    );
};

export default ConfirmDialog;
