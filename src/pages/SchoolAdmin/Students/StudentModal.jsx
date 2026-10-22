import { useEffect, useState } from "react";

import Modal from "../../../components/ui/Modal";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button/Button";

import { useClasses } from "../../../context/SchoolAdmin/ClassesContext";

const EMPTY_FORM = {
    name: "",
    email: "",
    classes_assigned: [],
    status: "active",
};

const StudentModal = ({
    isOpen,
    onClose,
    onSave,
    student = null,
    saving = false,
    saveError = "",
}) => {
    const {
        classes,
        loading: classesLoading,
        error: classesError,
    } = useClasses();

    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!isOpen) return;

        if (student) {
            setForm({
                name: student.name ?? "",
                email: student.email ?? "",
                classes_assigned:
                    (student.classes_assigned ?? student.classes ?? [])
                        .map((item) =>
                            String(item?.id ?? item)
                        ),
                status: String(
                    student.status ?? "active"
                ).toLowerCase(),
            });
        } else {
            setForm(EMPTY_FORM);
        }

        setErrors({});
    }, [isOpen, student]);

    if (!isOpen) return null;

    const updateField = (name, value) => {
        setForm((current) => ({
            ...current,
            [name]: value,
        }));

        setErrors((current) => ({
            ...current,
            [name]: "",
        }));
    };

    const validate = () => {
        const nextErrors = {};

        if (!form.name.trim()) {
            nextErrors.name = "Student name is required.";
        }

        if (
            form.email.trim() &&
            !/\S+@\S+\.\S+/.test(form.email)
        ) {
            nextErrors.email = "Please enter a valid email address.";
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
            classes_assigned:
                form.classes_assigned.map(Number),
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            customClass="student-modal"
            title={student ? "Edit student" : "Add student"}
        >
            <form
                className="student-modal__form"
                onSubmit={handleSubmit}
            >
                {saveError && (
                    <div
                        className="student-modal__alert"
                        role="alert"
                    >
                        {saveError}
                    </div>
                )}

                <h3 className="student-modal__section-title">
                    Student information
                </h3>

                <Input
                    id="student-name"
                    label="Name"
                    name="name"
                    placeholder="Enter student name"
                    value={form.name}
                    onChange={(e) =>
                        updateField("name", e.target.value)
                    }
                    error={errors.name}
                    required
                />

                <Input
                    id="student-email"
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={form.email}
                    onChange={(e) =>
                        updateField("email", e.target.value)
                    }
                    error={errors.email}
                />

                <h3 className="student-modal__section-title">
                    Enrollment
                </h3>

                <Input
                    id="student-classes"
                    as="select"
                    label="Classes"
                    name="classes_assigned"
                    multiple
                    size={Math.min(
                        Math.max(classes.length, 3),
                        6
                    )}
                    value={form.classes_assigned}
                    onChange={(e) =>
                        updateField(
                            "classes_assigned",
                            Array.from(
                                e.target.selectedOptions,
                                (option) => option.value
                            )
                        )
                    }
                    disabled={
                        classesLoading ||
                        Boolean(classesError)
                    }
                    options={classes.map((item) => ({
                        value: item.id,
                        label: item.name,
                    }))}
                />

                <Input
                    id="student-status"
                    as="select"
                    label="Status"
                    name="status"
                    value={form.status}
                    onChange={(e) =>
                        updateField(
                            "status",
                            e.target.value
                        )
                    }
                    options={[
                        {
                            value: "active",
                            label: "Active",
                        },
                        {
                            value: "pending",
                            label: "Pending",
                        },
                        {
                            value: "invited",
                            label: "Invited",
                        },
                    ]}
                />

                <div className="modal-actions">
                    <Button
                        className="btn-secondary"
                        text="Cancel"
                        type="button"
                        onClick={onClose}
                        disabled={saving}
                    />

                    <Button
                        className="btn-primary"
                        text={
                            saving
                                ? "Saving..."
                                : student
                                    ? "Save changes"
                                    : "Add student"
                        }
                        type="submit"
                        disabled={saving}
                    />
                </div>
            </form>
        </Modal>
    );
};

export default StudentModal;