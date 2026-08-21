import { useState } from 'react';
import Modal from '../../../components/Modal.jsx'
import Button from '../../../components/Button.jsx'
import Input from '../../../components/Input.jsx'

const CategoriesModal = ({ isOpen, onClose, category, onSave }) => {
    const [editedName, setEditedName] = useState(category?.displayName || '');

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className='modal-body'>
                <header className='modal-header'>
                    <h2>Edit Category</h2>
                    <p>Editing category: {category?.apiNames}</p>
                </header>
                <form
                    className='modal-form'
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSave(category.id, editedName);
                    }}>
                    <Input
                        className='modal-input'
                        type="text"
                        id="categoryName"
                        name="categoryName"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        required
                    />
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
