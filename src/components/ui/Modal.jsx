import './Modal.css'

function Modal({ isOpen, onClose, children, customClass }) {

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={customClass || "modal"}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal