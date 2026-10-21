import { useEffect, useState } from 'react';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button/Button';
import { useTeachers } from '../../../context/SchoolAdmin/TeachersContext';

const defaultForm = {
  name: '',
  description: '',
  teacher_id: '',
};

const ClassModal = ({ isOpen, onClose, onSave, classItem = null }) => {
  const { teachers } = useTeachers();
  const [formData, setFormData] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) return;

    if (classItem) {
      setFormData({
        name: classItem.name ?? '',
        description: classItem.description ?? '',
        teacher_id: classItem.teacherId ?? classItem.teacher_id ?? '',
      });
      return;
    }

    setFormData(defaultForm);
  }, [isOpen, classItem]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const nextErrors = {};
    const name = formData.name.trim();
    const description = formData.description.trim();

    if (!name) {
      nextErrors.name = 'Class name is required.';
    }

    if (!formData.teacher_id) {
      nextErrors.teacher_id = 'Teacher is required.';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const payload = {
      id: classItem?.id ?? null,
      name: formData.name.trim(),
      description: formData.description.trim() || 'No description available.',
      teacher_id: Number(formData.teacher_id),
      studentsCount: classItem?.studentsCount ?? 0,
    };

    onSave(payload);
    setFormData(defaultForm);
    setErrors({});
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={classItem ? 'Edit Class' : 'Add Class'}>
      <form onSubmit={handleSubmit}>
        <Input
          label="Class Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <Input
          as="select"
          label="Teacher"
          name="teacher_id"
          id="class-teacher"
          value={formData.teacher_id}
          onChange={handleChange}
          error={errors.teacher_id}
          options={teachers.map((teacher) => ({
            value: teacher.id,
            label: `${teacher.name} (${teacher.subject})`,
          }))}
        />

        <Input
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
        />

        <div className="modal-actions">
          <Button className="btn-secondary" type="button" text="Cancel" onClick={onClose} />
          <Button className="btn-primary" type="submit" text={classItem ? 'Update' : 'Save'} />
        </div>
      </form>
    </Modal>
  );
};

export default ClassModal;
