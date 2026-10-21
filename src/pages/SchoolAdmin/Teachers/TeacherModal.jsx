import { useEffect, useState } from 'react';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button/Button';

const defaultForm = {
    name: '',
    email: '',
    subject: '',
    status: 'Active',
};

const TeacherModal = ({ isOpen, onClose, onSave, teacher = null }) => {
    const [formData, setFormData] = useState(defaultForm);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!isOpen) return;

        if (teacher) {
            setFormData({
                name: teacher.name ?? '',
                email: teacher.email ?? '',
                subject: teacher.subject ?? '',
                status: teacher.status ?? 'Active',
            });
            return;
        }

        setFormData(defaultForm);
    }, [isOpen, teacher]);

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
            id: teacher?.id ?? null,
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim(),
            status: formData.status || 'active',
            classesAssigned: teacher?.classesAssigned ?? [],
        };

        onSave(teacherData);

        setFormData(defaultForm);
        setErrors({});
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={teacher ? 'Edit Teacher' : 'Add Teacher'}>
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
                <Input
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
                <div className="modal-actions">
                    <Button className="btn-secondary" type="button" text="Cancel" onClick={onClose} />
                    <Button className="btn-primary" type="submit" text={teacher ? 'Update' : 'Save'} />
                </div>
            </form>
        </Modal>
    );
};

export default TeacherModal;