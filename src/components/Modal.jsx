import React from 'react'

import Button from './Button.jsx'
import './Modal.css'

function Modal({ isOpen, onClose, children }) {

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal">
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