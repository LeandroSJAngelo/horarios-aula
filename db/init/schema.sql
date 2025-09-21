DROP TABLE IF EXISTS class_schedule CASCADE;
DROP TABLE IF EXISTS class CASCADE;
DROP TABLE IF EXISTS subject_prerequisite CASCADE;
DROP TABLE IF EXISTS subject CASCADE;
DROP TABLE IF EXISTS room CASCADE;
DROP TABLE IF EXISTS building CASCADE;
DROP TABLE IF EXISTS professor CASCADE;
DROP TABLE IF EXISTS department CASCADE;
DROP TABLE IF EXISTS title CASCADE;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE title (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE professor (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department_id INT REFERENCES department(id) ON DELETE SET NULL,
    title_id INT REFERENCES title(id) ON DELETE SET NULL
);

CREATE TABLE building (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE room (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    building_id INT REFERENCES building(id) ON DELETE CASCADE
);

CREATE TABLE subject (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    professor_id INT REFERENCES professor(id) ON DELETE SET NULL
);

CREATE TABLE subject_prerequisite (
    id SERIAL PRIMARY KEY,
    subject_id INT REFERENCES subject(id) ON DELETE CASCADE,
    prerequisite_id INT REFERENCES subject(id) ON DELETE CASCADE,
    CONSTRAINT uq_sub_prereq UNIQUE (subject_id, prerequisite_id)
);

CREATE TABLE class (
    id SERIAL PRIMARY KEY,
    subject_id INT REFERENCES subject(id) ON DELETE CASCADE,
    year INT NOT NULL,
    semester INT NOT NULL,
    code VARCHAR(20) NOT NULL
);

CREATE TABLE class_schedule (
    id SERIAL PRIMARY KEY,
    class_id INT REFERENCES class(id) ON DELETE CASCADE,
    room_id INT REFERENCES room(id) ON DELETE CASCADE,
    day_of_week VARCHAR(10) NOT NULL CHECK (day_of_week IN ('Mon','Tue','Wed','Thu','Fri','Sat','Sun')),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    CONSTRAINT ck_time_order CHECK (end_time > start_time)
);
