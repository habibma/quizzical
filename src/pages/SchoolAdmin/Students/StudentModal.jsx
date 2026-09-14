import React, { useState } from 'react';

import Modal from "../../../components/ui/Modal";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

const StudentModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        className: '',
        email: '',
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
        const className = formData.className.trim();
        const email = formData.email.trim();

        if (!name) {
            nextErrors.name = 'Student name is required.';
        }

        if (!className) {
            nextErrors.className = 'Class is required.';
        }

        if (!email) {
            nextErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            nextErrors.email = 'Please enter a valid email address.';
        }

        return nextErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const nextErrors = validateForm();

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        const studentData = {
            id: Date.now().toString(),
            name: formData.name.trim(),
            className: formData.className.trim(),
            email: formData.email.trim(),
            profilePic: null,
            grade: null,
        };

        onSave(studentData);

        setFormData({
            name: '',
            className: '',
            email: '',
        });
        setErrors({});
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen} customClass="student-modal">
            <div className="student-modal__header">
                <h2>Add New Student</h2>
                <p>Enter student details below to add them to this school.</p>
            </div>

            <form className="student-modal__form" onSubmit={handleSubmit}>
                <div className="student-modal__field">
                    <Input
                        id="student-name"
                        label="Name"
                        name="name"
                        placeholder="Enter student name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                </div>

                <div className="student-modal__field">
                    <Input
                        id="student-class"
                        label="Class"
                        name="className"
                        placeholder="Enter class name"
                        value={formData.className}
                        onChange={handleChange}
                        required
                    />
                    {errors.className && <span className="field-error">{errors.className}</span>}
                </div>

                <div className="student-modal__field">
                    <Input
                        id="student-email"
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className="modal-actions">
                    <Button
                        className="btn-secondary"
                        text="Cancel"
                        type="button"
                        onClick={onClose}
                    />

                    <Button
                        className="btn-primary"
                        text="Save"
                        type="submit"
                    />
                </div>
            </form>
        </Modal>
    );
};

export default StudentModal;