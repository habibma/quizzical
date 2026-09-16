import { useEffect, useRef } from 'react'

import './Modal.css'

function Modal({
    isOpen,
    onClose,
    children,
    customClass,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}) {
    const modalRef = useRef(null)
    const onCloseRef = useRef(onClose)
    const previouslyFocusedRef = useRef(null)

    useEffect(() => {
        onCloseRef.current = onClose
    }, [onClose])

    useEffect(() => {
        if (!isOpen) {
            return undefined
        }

        previouslyFocusedRef.current = document.activeElement
        modalRef.current?.focus()

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onCloseRef.current()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            previouslyFocusedRef.current?.focus?.()
        }
    }, [isOpen])

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className={customClass ? `modal ${customClass}` : 'modal'}
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                aria-describedby={ariaDescribedBy}
                tabIndex="-1"
            >
                <div className="modal-content" onClick={(event) => event.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal