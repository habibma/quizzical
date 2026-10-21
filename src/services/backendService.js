const   API_URL = "http://localhost:3000";

export async function getCategories() {
  try {
    const response = await fetch(`${API_URL}/api/categories`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getStudents() {
  try {
    const response = await fetch(`${API_URL}/api/students`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
}

export async function createStudent(studentData) {
  try {
    const response = await fetch(`${API_URL}/api/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
}

export async function updateStudent(studentId, studentData) {
  try {
    const response = await fetch(`${API_URL}/api/students/${studentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
}

export async function deleteStudent(studentId) {
  try {
    const response = await fetch(`${API_URL}/api/students/${studentId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
}

export async function getTeachers() {
  try {
    const response = await fetch(`${API_URL}/api/teachers`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return [];
  }
}

export async function createTeacher(teacherData) {
  try {
    const response = await fetch(`${API_URL}/api/teachers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teacherData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating teacher:", error);
    throw error;
  }
}

export async function updateTeacher(teacherId, teacherData) {
  try {
    const response = await fetch(`${API_URL}/api/teachers/${teacherId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teacherData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating teacher:", error);
    throw error;
  }
}

export async function deleteTeacher(teacherId) {
  try {
    const response = await fetch(`${API_URL}/api/teachers/${teacherId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting teacher:", error);
    throw error;
  }
}

export async function getClasses() {
  try {
    const response = await fetch(`${API_URL}/api/classes`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    return [];
  }
}

export async function createClass(classData) {
  try {
    const response = await fetch(`${API_URL}/api/classes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating class:", error);
    throw error;
  }
}

export async function updateClass(classId, classData) {
  try {
    const response = await fetch(`${API_URL}/api/classes/${classId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating class:", error);
    throw error;
  }
}

export async function deleteClass(classId) {
  try {
    const response = await fetch(`${API_URL}/api/classes/${classId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting class:", error);
    throw error;
  }
}