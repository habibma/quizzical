
-- =========================================
-- Quizzical Database Schema
-- =========================================

CREATE TABLE schools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    school_id INTEGER NOT NULL REFERENCES schools(id),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT,
    role VARCHAR(20) NOT NULL
        CHECK (role IN ('admin', 'teacher', 'student')),
    status VARCHAR(20) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'invited', 'pending')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_roles (
    user_id INTEGER NOT NULL
        REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL
        CHECK (role IN ('admin', 'teacher', 'student')),
    PRIMARY KEY (user_id, role)
);

CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('active', 'invited', 'pending')),
    user_id INTEGER UNIQUE REFERENCES users(id),
    school_id INTEGER NOT NULL REFERENCES schools(id)
);

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('active', 'invited', 'pending')),
    user_id INTEGER UNIQUE REFERENCES users(id),
    school_id INTEGER NOT NULL REFERENCES schools(id)
);

CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    school_id INTEGER NOT NULL REFERENCES schools(id)
);

CREATE TABLE class_teachers (
    class_id INTEGER NOT NULL
        REFERENCES classes(id) ON DELETE CASCADE,
    teacher_id INTEGER NOT NULL
        REFERENCES teachers(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (class_id, teacher_id)
);

CREATE TABLE class_students (
    class_id INTEGER NOT NULL
        REFERENCES classes(id) ON DELETE CASCADE,
    student_id INTEGER NOT NULL
        REFERENCES students(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (class_id, student_id)
);

-- =========================================
-- Indexes
-- =========================================

CREATE INDEX idx_users_school_id ON users(school_id);
CREATE INDEX idx_teachers_school_id ON teachers(school_id);
CREATE INDEX idx_students_school_id ON students(school_id);
CREATE INDEX idx_classes_school_id ON classes(school_id);
CREATE INDEX idx_class_teachers_teacher_id ON class_teachers(teacher_id);
CREATE INDEX idx_class_students_student_id ON class_students(student_id);
