import React, { useEffect, useState } from 'react';

import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button/Button';
import { useClasses } from '../../../context/SchoolAdmin/ClassesContext';

const defaultForm = {
    name: '',
    class_id: '',
    email: '',
    status: 'active',
};

const StudentModal = ({ isOpen, onClose, onSave, student = null }) => {
    const { classes } = useClasses();
    const [formData, setFormData] = useState(defaultForm);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!isOpen) return;

        if (student) {
            setFormData({
                name: student.name ?? '',
                class_id: student.class_id ?? '',
                email: student.email ?? '',
                status: student.status ?? 'active',
            });
            return;
        }

        setFormData(defaultForm);
    }, [isOpen, student]);

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

        if (!name) {
            nextErrors.name = 'Student name is required.';
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
            id: student?.id ?? null,
            name: formData.name.trim(),
            class_id: formData.class_id ? Number(formData.class_id) : null,
            email: formData.email.trim(),
            profilePic: student?.profilePic ?? null,
            status: formData.status || 'active',
        };

        onSave(studentData);

        setFormData(defaultForm);
        setErrors({});
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen} customClass="student-modal" title={student ? 'Edit Student' : 'Add Student'}>
            <form className="student-modal__form" onSubmit={handleSubmit}>
                <div className="student-modal__field">
                    <Input
                        id="student-name"
                        label="Name"
                        name="name"
                        placeholder="Enter student name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                </div>

                <div className="student-modal__field">
                    <Input
                        id="student-class"
                        as="select"
                        label="Class"
                        name="class_id"
                        value={formData.class_id}
                        onChange={handleChange}
                        error={errors.class_id}
                        options={classes.map((classItem) => ({
                            value: classItem.id,
                            label: classItem.name,
                        }))}
                    />
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
                        error={errors.email}
                    />
                </div>

                <div className="student-modal__field">
                    <Input
                        id="student-status"
                        as="select"
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        options={[
                            { value: 'active', label: 'Active' },
                            { value: 'pending', label: 'Pending' },
                            { value: 'invited', label: 'Invited' },
                        ]}
                    />
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
                        text={student ? 'Update' : 'Save'}
                        type="submit"
                    />
                </div>
            </form>
        </Modal>
    );
};

export default StudentModal;