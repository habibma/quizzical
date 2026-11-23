const getTimestamp = (record = {}) => record.createdAt ?? record.created_at ?? record.updatedAt ?? record.updated_at ?? record.enrolled_at ?? null;
const getFallbackId = (record = {}) => Number.isFinite(Number(record.id)) ? Number(record.id) : 0;
const getClasses = (record = {}) => Array.isArray(record.classes_assigned) ? record.classes_assigned : record.classes ?? [];
const className = (classItem) => classItem?.name ?? `Class ${classItem?.id ?? classItem}`;

const createActivity = ({ id, type, name, action, status = 'active', email = '', createdAt = null, target = null, details = {} }) => ({
    id,
    type,
    name,
    action,
    actor: 'Actor unavailable',
    status: String(status).toLowerCase(),
    email,
    createdAt,
    target,
    fallbackId: getFallbackId({ id, ...details }),
    details: {
        id: details.id ?? 'Unavailable',
        email: email || 'Unavailable',
        status: String(status).toLowerCase(),
        targetId: details.targetId ?? 'Unavailable',
        targetName: target || 'Unavailable',
    },
});

const normalizePerson = (record, type) => createActivity({
    id: `${type}-${record.id ?? record.email ?? record.name}`,
    type,
    name: record.name || `Unnamed ${type}`,
    action: `Current ${type} record`,
    status: record.status || 'active',
    email: record.email,
    createdAt: getTimestamp(record),
    details: { id: record.id },
});

export const buildActivities = (students = [], teachers = [], classes = []) => {
    const activities = [
        ...students.map((student) => normalizePerson(student, 'student')),
        ...teachers.map((teacher) => normalizePerson(teacher, 'teacher')),
        ...classes.map((classroom) => normalizePerson(classroom, 'class')),
    ];

    students.forEach((student) => getClasses(student).forEach((classItem) => activities.push(createActivity({
        id: `enrollment-${student.id}-${classItem?.id ?? classItem}`,
        type: 'enrollment',
        name: student.name || 'Unnamed student',
        action: 'Student enrolled',
        target: className(classItem),
        createdAt: getTimestamp(classItem),
        status: student.status || 'active',
        email: student.email,
        details: { id: student.id, targetId: classItem?.id },
    }))));

    teachers.forEach((teacher) => getClasses(teacher).forEach((classItem) => activities.push(createActivity({
        id: `assignment-${teacher.id}-${classItem?.id ?? classItem}`,
        type: 'assignment',
        name: teacher.name || 'Unnamed teacher',
        action: 'Teacher assigned',
        target: className(classItem),
        createdAt: getTimestamp(classItem),
        status: teacher.status || 'active',
        email: teacher.email,
        details: { id: teacher.id, targetId: classItem?.id },
    }))));

    return activities.sort((first, second) => {
    const firstTime = first.createdAt ? new Date(first.createdAt).getTime() : NaN;
    const secondTime = second.createdAt ? new Date(second.createdAt).getTime() : NaN;

    if (Number.isFinite(firstTime) && Number.isFinite(secondTime) && firstTime !== secondTime) {
        return secondTime - firstTime;
    }

    if (Number.isFinite(firstTime) !== Number.isFinite(secondTime)) {
        return Number.isFinite(secondTime) - Number.isFinite(firstTime);
    }

        return second.fallbackId - first.fallbackId;
    });
};

export const formatActivityDate = (createdAt) => {
    if (!createdAt) return 'Date unavailable';

    const date = new Date(createdAt);
    if (Number.isNaN(date.getTime())) return 'Date unavailable';

    return new Intl.DateTimeFormat(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(date);
};
