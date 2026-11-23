const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const SCHOOL_STORAGE_KEY = 'schoolId';

export const getSchoolId = () => {
  if (typeof window !== 'undefined') {
    const storedSchoolId = window.localStorage.getItem(SCHOOL_STORAGE_KEY);
    if (storedSchoolId) return Number(storedSchoolId);
  }

  const configuredSchoolId = import.meta.env.VITE_SCHOOL_ID;
  return configuredSchoolId ? Number(configuredSchoolId) : null;
};

export const setSchoolId = (schoolId) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(SCHOOL_STORAGE_KEY, String(schoolId));
  }
};

export const resolveSchoolId = async () => {
  const currentSchoolId = getSchoolId();
  if (currentSchoolId) return currentSchoolId;

  const schools = await request('/api/schools');
  const firstSchoolId = Array.isArray(schools) ? schools[0]?.id : null;

  if (!firstSchoolId) {
    throw new Error('No school is configured. Create a school before adding teachers.');
  }

  setSchoolId(firstSchoolId);
  return firstSchoolId;
};

const buildQuery = (params = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, value);
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : '';
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(data?.error || `Request failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return data;
};

const jsonOptions = (method, body) => ({
  method,
  body: JSON.stringify(body),
});

const schoolQuery = () => buildQuery({ school_id: getSchoolId() });

export const getStudents = () => request(`/api/students${schoolQuery()}`);
export const getStudent = (studentId) => request(`/api/students/${studentId}`);
export const createStudent = (studentData) => request('/api/students', jsonOptions('POST', studentData));
export const updateStudent = (studentId, studentData) => request(`/api/students/${studentId}`, jsonOptions('PUT', studentData));
export const deleteStudent = (studentId) => request(`/api/students/${studentId}`, { method: 'DELETE' });

export const getTeachers = () => request(`/api/teachers${schoolQuery()}`);
export const getTeacher = (teacherId) => request(`/api/teachers/${teacherId}`);
export const createTeacher = (teacherData) => request('/api/teachers', jsonOptions('POST', teacherData));
export const updateTeacher = (teacherId, teacherData) => request(`/api/teachers/${teacherId}`, jsonOptions('PUT', teacherData));
export const deleteTeacher = (teacherId) => request(`/api/teachers/${teacherId}`, { method: 'DELETE' });

export const getClasses = () => request(`/api/classes${schoolQuery()}`);
export const getClass = (classId) => request(`/api/classes/${classId}`);
export const createClass = (classData) => request('/api/classes', jsonOptions('POST', classData));
export const updateClass = (classId, classData) => request(`/api/classes/${classId}`, jsonOptions('PUT', classData));
export const deleteClass = (classId) => request(`/api/classes/${classId}`, { method: 'DELETE' });

export const getUsers = () => request(`/api/users${schoolQuery()}`);
export const getUser = (userId) => request(`/api/users/${userId}`);
export const createUser = (userData) => request('/api/users', jsonOptions('POST', userData));
export const updateUser = (userId, userData) => request(`/api/users/${userId}`, jsonOptions('PUT', userData));
export const deleteUser = (userId) => request(`/api/users/${userId}`, { method: 'DELETE' });

export const getSchools = () => request('/api/schools');
export const getSchool = (schoolId) => request(`/api/schools/${schoolId}`);
export const createSchool = (schoolData) => request('/api/schools', jsonOptions('POST', schoolData));
export const updateSchool = (schoolId, schoolData) => request(`/api/schools/${schoolId}`, jsonOptions('PUT', schoolData));
export const deleteSchool = (schoolId) => request(`/api/schools/${schoolId}`, { method: 'DELETE' });