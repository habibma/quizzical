import './Modal.css'

function Modal({ isOpen, onClose, children, customClass }) {

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className={customClass ? `modal ${customClass}` : 'modal'}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal