import { useEffect, useState } from 'react';
import Modal from '../../../components/ui/Modal';
import Button from '../../../components/ui/Button/Button';
import Input from '../../../components/ui/Input';

const CategoriesModal = ({ isOpen, onClose, category, onSave, existingNames = [] }) => {
    const [editedName, setEditedName] = useState(category?.displayName || '');
    const [editedIcon, setEditedIcon] = useState(category?.icon || ' ');
    const [editedColor, setEditedColor] = useState(category?.color || '#6366f1');
    const [editedOrder, setEditedOrder] = useState(category?.displayOrder || 0);
    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        setEditedName(category?.displayName || '');
        setEditedIcon(category?.icon || ' ');
        setEditedColor(category?.color || '#6366f1');
        setEditedOrder(category?.displayOrder || 0);
        setValidationError('');
    }, [category]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const nextName = editedName.trim();

        if (!nextName) {
            setValidationError('Enter a category name.');
            return;
        }

        if (existingNames.some(name => name.toLowerCase() === nextName.toLowerCase() && name.toLowerCase() !== category?.displayName?.toLowerCase())) {
            setValidationError('A category with this name already exists.');
            return;
        }

        onSave(category.id, {
            displayName: nextName,
            icon: editedIcon.trim() || ' ',
            color: editedColor,
            displayOrder: Number(editedOrder) || 0,
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className='modal-body'>
                <header className='modal-header'>
                    <h2>Edit Category</h2>
                    <p>API name: {category?.apiName}</p>
                </header>
                <form
                    className='modal-form'
                    onSubmit={handleSubmit}>
                    <Input
                        className='modal-input'
                        type="text"
                        id="categoryName"
                        name="categoryName"
                        label="Display name"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        required
                    />
                    <Input
                        type="text"
                        id="categoryIcon"
                        name="categoryIcon"
                        label="Icon name"
                        value={editedIcon}
                        onChange={(e) => setEditedIcon(e.target.value)}
                    />
                    <div className="category-color-field">
                        <label htmlFor="categoryColor">Color</label>
                        <input id="categoryColor" type="color" value={editedColor} onChange={(e) => setEditedColor(e.target.value)} />
                    </div>
                    <Input
                        type="number"
                        id="categoryOrder"
                        name="categoryOrder"
                        label="Display order"
                        min="0"
                        value={editedOrder}
                        onChange={(e) => setEditedOrder(e.target.value)}
                    />
                    {validationError && <p className="category-validation-error" role="alert">{validationError}</p>}
                    <div className='modal-actions'>
                        <Button className="btn-primary" type="submit" text="Save" />
                        <Button className="btn-secondary" type="button" text="Cancel" onClick={onClose} />
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default CategoriesModal;
