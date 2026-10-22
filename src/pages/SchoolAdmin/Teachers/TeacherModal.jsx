import { useEffect, useState } from 'react';

import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button/Button';

import { useClasses } from '../../../context/SchoolAdmin/ClassesContext';

const EMPTY_FORM = {
    name: '',
    email: '',
    status: 'active',
    classes_assigned: [],
};

const TeacherModal = ({
    isOpen,
    onClose,
    onSave,
    teacher = null,
}) => {
    const { classes } = useClasses();

    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!isOpen) return;

        if (teacher) {
            setForm({
                name: teacher.name ?? '',
                email: teacher.email ?? '',
                status: teacher.status ?? 'active',
                classes_assigned:
                    teacher.classes_assigned?.map(
                        (item) => String(item.id ?? item)
                    ) ?? [],
            });
        } else {
            setForm(EMPTY_FORM);
        }

        setErrors({});
    }, [isOpen, teacher]);

    if (!isOpen) return null;

    const updateField = (name, value) => {
        setForm((current) => ({
            ...current,
            [name]: value,
        }));

        setErrors((current) => ({
            ...current,
            [name]: '',
        }));
    };

    const validate = () => {
        const nextErrors = {};

        if (!form.name.trim()) {
            nextErrors.name = 'Name is required.';
        }

        if (!form.email.trim()) {
            nextErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            nextErrors.email = 'Enter a valid email.';
        }

        return nextErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const nextErrors = validate();

        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            return;
        }

        await onSave({
            name: form.name.trim(),
            email: form.email.trim(),
            status: form.status,
            classes_assigned: form.classes_assigned.map(Number),
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={teacher ? 'Edit Teacher' : 'Add Teacher'}
        >
            <form onSubmit={handleSubmit}>
                <Input
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={(e) =>
                        updateField('name', e.target.value)
                    }
                    error={errors.name}
                />

                <Input
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={(e) =>
                        updateField('email', e.target.value)
                    }
                    error={errors.email}
                />

                <Input
                    as="select"
                    label="Classes"
                    name="classes_assigned"
                    multiple
                    value={form.classes_assigned}
                    onChange={(e) =>
                        updateField(
                            'classes_assigned',
                            Array.from(
                                e.target.selectedOptions,
                                (option) => option.value
                            )
                        )
                    }
                    options={classes.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }))}
                />

                <Input
                    as="select"
                    label="Status"
                    name="status"
                    value={form.status}
                    onChange={(e) =>
                        updateField('status', e.target.value)
                    }
                    options={[
                        { value: 'active', label: 'Active' },
                        { value: 'pending', label: 'Pending' },
                        { value: 'invited', label: 'Invited' },
                    ]}
                />

                <div className="modal-actions">
                    <Button
                        type="button"
                        className="btn-secondary"
                        text="Cancel"
                        onClick={onClose}
                    />

                    <Button
                        type="submit"
                        className="btn-primary"
                        text={teacher ? 'Update' : 'Save'}
                    />
                </div>
            </form>
        </Modal>
    );
};

export default TeacherModal;