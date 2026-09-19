import { useEffect, useId, useRef } from 'react'

import './Modal.css'

function Modal({
    isOpen,
    onClose,
    children,
    customClass,
    title,
    role = 'dialog',
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
}) {
    const modalRef = useRef(null)
    const onCloseRef = useRef(onClose)
    const previouslyFocusedRef = useRef(null)
    const generatedTitleId = useId()
    const titleId = ariaLabelledBy || (title ? generatedTitleId : undefined)

    useEffect(() => {
        onCloseRef.current = onClose
    }, [onClose])

    useEffect(() => {
        if (!isOpen) {
            return undefined
        }

        previouslyFocusedRef.current = document.activeElement

        const focusableSelector = [
            'button:not([disabled])',
            '[href]',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
        ].join(',')

        const focusableElements = () => [...(modalRef.current?.querySelectorAll(focusableSelector) ?? [])]
        const firstFocusable = focusableElements()[0]
        ;(firstFocusable ?? modalRef.current)?.focus()

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onCloseRef.current()
                return
            }

            if (event.key !== 'Tab') return

            const elements = focusableElements()
            if (elements.length === 0) {
                event.preventDefault()
                modalRef.current?.focus()
                return
            }

            const firstElement = elements[0]
            const lastElement = elements[elements.length - 1]

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault()
                lastElement.focus()
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault()
                firstElement.focus()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = previousOverflow
            previouslyFocusedRef.current?.focus?.()
        }
    }, [isOpen])

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" onMouseDown={onClose}>
            <div
                className={customClass ? `modal ${customClass}` : 'modal'}
                ref={modalRef}
                role={role}
                aria-modal="true"
                aria-label={ariaLabel}
                aria-labelledby={titleId}
                aria-describedby={ariaDescribedBy}
                tabIndex="-1"
                onMouseDown={(event) => event.stopPropagation()}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        {title && <h2 id={generatedTitleId}>{title}</h2>}
                        <button type="button" className="modal-close" onClick={onClose} aria-label="Close dialog">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal