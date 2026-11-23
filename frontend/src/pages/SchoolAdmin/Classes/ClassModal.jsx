import { useEffect, useState } from 'react';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button/Button';
import { useTeachers } from '../../../context/SchoolAdmin/TeachersContext';

const defaultForm = { name: '', description: '', teacher_ids: [] };

const ClassModal = ({ isOpen, onClose, onSave, classItem = null, saving = false, saveError = '' }) => {
  const { teachers, loading: teachersLoading, error: teachersError } = useTeachers();
  const [formData, setFormData] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) return;
    if (!classItem) {
      setFormData(defaultForm);
      setErrors({});
      return;
    }

    setFormData({
      name: classItem.name ?? '',
      description: classItem.description ?? '',
      teacher_ids: (classItem.teachers ?? [])
        .map((teacher) => teacher?.id ?? teacher?.teacher_id ?? teacher)
        .filter(Boolean)
        .map(String),
    });
    setErrors({});
  }, [isOpen, classItem]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: '' }));
  };

  const handleTeacherChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      teacher_ids: Array.from(event.target.selectedOptions, (option) => option.value),
    }));
    setErrors((previous) => ({ ...previous, teacher_ids: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Class name is required.';
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSave({
      id: classItem?.id ?? null,
      name: formData.name.trim(),
      description: formData.description.trim(),
      teacher_ids: formData.teacher_ids.map(Number),
      studentsCount: classItem?.studentsCount ?? 0,
    });
  };

  const teacherHelp = teachersLoading
    ? 'Loading teachers...'
    : teachersError
      ? 'Unable to load teachers.'
      : teachers.length
        ? 'Select one or more teachers, or leave this unassigned.'
        : 'No teachers are available yet.';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={classItem ? 'Edit class' : 'Add class'}>
      <form className="class-modal__form" onSubmit={handleSubmit}>
        <p className="class-modal__intro">{classItem ? 'Update the class details and teacher assignments.' : 'Create a class for your school.'}</p>
        {saveError && <div className="class-modal__alert" role="alert">{saveError}</div>}
        <h3 className="class-modal__section-title">Class information</h3>
        <Input id="class-name" label="Class name" name="name" placeholder="e.g. Class 8A" value={formData.name} onChange={handleChange} error={errors.name} required />
        <Input id="class-description" label="Description" name="description" placeholder="Optional class description" value={formData.description} onChange={handleChange} error={errors.description} />
        <h3 className="class-modal__section-title">Assignment</h3>
        <Input
          as="select"
          label="Teachers (optional)"
          name="teacher_ids"
          id="class-teachers"
          multiple
          size={Math.min(Math.max(teachers.length, 3), 6)}
          value={formData.teacher_ids}
          onChange={handleTeacherChange}
          error={errors.teacher_ids}
          disabled={teachersLoading || Boolean(teachersError)}
          options={teachers.map((teacher) => ({ value: teacher.id, label: teacher.name }))}
        />
        <small className="class-modal__help">{teacherHelp}</small>
        <div className="modal-actions">
          <Button className="btn-secondary" type="button" text="Cancel" onClick={onClose} disabled={saving} />
          <Button className="btn-primary" type="submit" text={saving ? 'Saving...' : classItem ? 'Save changes' : 'Add class'} disabled={saving} />
        </div>
      </form>
    </Modal>
  );
};

export default ClassModal;
