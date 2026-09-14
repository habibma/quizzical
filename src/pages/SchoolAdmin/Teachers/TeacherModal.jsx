import { useState, useMemo } from 'react';
import Modal from "../../../components/ui/Modal";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

const TeacherModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        //classesAssigned: []
    });
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    };

    const validateForm = () => {
        const nextErrors = {};
        const name = formData.name.trim();
        const email = formData.email.trim();
        const subject = formData.subject.trim();
        //const classesAssigned = formData.classesAssigned;

        if (!name) {
            nextErrors.name = 'Teacher name is required.';
        }
        if (!email) {
            nextErrors.email = 'Teacher email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            nextErrors.email = 'Teacher email is invalid.';
        }
        if (!subject) {
            nextErrors.subject = 'Teacher subject is required.';
        }
        // if (!classesAssigned || classesAssigned.length === 0) {
        //     nextErrors.classesAssigned = 'At least one class must be assigned.';
        // }

        return nextErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const nextErrors = validateForm();

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        const teacherData = {
            id: Date.now().toString(),
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim(),
            //classesAssigned: formData.classesAssigned
        };

        onSave(teacherData);

        setFormData({
            name: '',
            email: '',
            subject: '',
            //classesAssigned: []
        });
        setErrors({});
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Add Teacher</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <Input
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <Input
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={errors.subject}
                />
                {/* <Input
                    label="Classes Assigned"
                    name="classesAssigned"
                    value={formData.classesAssigned.join(', ')}
                    onChange={handleChange}
                    error={errors.classesAssigned}
                /> */}
                <div className="modal-actions">
                    <Button className='btn-secondary' type="button" text="Cancel" onClick={onClose} />
                    <Button className='btn-primary' type="submit" text="Save" />
                </div>
            </form>
        </Modal>
    );
};

export default TeacherModal;