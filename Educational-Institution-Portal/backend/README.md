# Educational Institution Portal - Backend

## Configuration

### Environment Variables (.env)

```
# Database Configuration
DB_USER=system
DB_PASSWORD=oracle
DB_CONNECTION_STRING=localhost:1521/xe

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-secret-key-change-in-production

# CORS Configuration
CORS_ORIGIN=http://localhost:4200
```

## Database Setup

### Create Database Tables

Run the following SQL scripts in Oracle SQL*Plus:

#### Users Table
```sql
CREATE TABLE users (
  id NUMBER PRIMARY KEY,
  name VARCHAR2(100) NOT NULL,
  email VARCHAR2(100) UNIQUE NOT NULL,
  phone VARCHAR2(20),
  password VARCHAR2(255) NOT NULL,
  role VARCHAR2(20) NOT NULL,
  enrollment_number VARCHAR2(50),
  department_id NUMBER,
  created_at TIMESTAMP DEFAULT SYSDATE,
  updated_at TIMESTAMP DEFAULT SYSDATE
);

CREATE SEQUENCE users_seq START WITH 1 INCREMENT BY 1;
```

#### Faculty Table
```sql
CREATE TABLE faculty (
  id NUMBER PRIMARY KEY,
  name VARCHAR2(100) NOT NULL,
  email VARCHAR2(100) UNIQUE NOT NULL,
  phone VARCHAR2(20),
  department_id NUMBER NOT NULL,
  specialization VARCHAR2(100),
  qualification VARCHAR2(100),
  experience NUMBER,
  office_room VARCHAR2(50),
  bio VARCHAR2(500),
  photo VARCHAR2(255),
  created_at TIMESTAMP DEFAULT SYSDATE,
  updated_at TIMESTAMP DEFAULT SYSDATE
);

CREATE SEQUENCE faculty_seq START WITH 1 INCREMENT BY 1;
```

#### Students Table
```sql
CREATE TABLE students (
  id NUMBER PRIMARY KEY,
  user_id NUMBER NOT NULL,
  enrollment_number VARCHAR2(50) UNIQUE NOT NULL,
  department_id NUMBER NOT NULL,
  semester_number NUMBER,
  gpa NUMBER(3,2),
  date_of_admission TIMESTAMP,
  status VARCHAR2(20),
  created_at TIMESTAMP DEFAULT SYSDATE,
  updated_at TIMESTAMP DEFAULT SYSDATE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE SEQUENCE students_seq START WITH 1 INCREMENT BY 1;
```

#### Departments Table
```sql
CREATE TABLE departments (
  id NUMBER PRIMARY KEY,
  department_name VARCHAR2(100) NOT NULL,
  head_name VARCHAR2(100),
  description VARCHAR2(500),
  total_faculty NUMBER DEFAULT 0,
  total_students NUMBER DEFAULT 0,
  created_at TIMESTAMP DEFAULT SYSDATE,
  updated_at TIMESTAMP DEFAULT SYSDATE
);

CREATE SEQUENCE departments_seq START WITH 1 INCREMENT BY 1;
```

#### Courses Table
```sql
CREATE TABLE courses (
  id NUMBER PRIMARY KEY,
  course_name VARCHAR2(100) NOT NULL,
  course_code VARCHAR2(20) UNIQUE NOT NULL,
  department_id NUMBER NOT NULL,
  faculty_id NUMBER,
  credits NUMBER,
  description VARCHAR2(500),
  semester NUMBER,
  schedule VARCHAR2(100),
  created_at TIMESTAMP DEFAULT SYSDATE,
  updated_at TIMESTAMP DEFAULT SYSDATE,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (faculty_id) REFERENCES faculty(id)
);

CREATE SEQUENCE courses_seq START WITH 1 INCREMENT BY 1;
```

#### Admissions Table
```sql
CREATE TABLE admissions (
  id NUMBER PRIMARY KEY,
  first_name VARCHAR2(100) NOT NULL,
  last_name VARCHAR2(100) NOT NULL,
  email VARCHAR2(100) NOT NULL,
  phone VARCHAR2(20),
  date_of_birth DATE,
  qualifications VARCHAR2(500),
  preferred_department NUMBER,
  application_date TIMESTAMP,
  status VARCHAR2(20) DEFAULT 'pending',
  marks NUMBER(5,2),
  created_at TIMESTAMP DEFAULT SYSDATE,
  updated_at TIMESTAMP DEFAULT SYSDATE
);

CREATE SEQUENCE admissions_seq START WITH 1 INCREMENT BY 1;
```

#### News Table
```sql
CREATE TABLE news (
  id NUMBER PRIMARY KEY,
  title VARCHAR2(255) NOT NULL,
  content CLOB NOT NULL,
  author VARCHAR2(100),
  publish_date TIMESTAMP,
  image VARCHAR2(255),
  category VARCHAR2(100),
  featured NUMBER DEFAULT 0,
  created_at TIMESTAMP DEFAULT SYSDATE,
  updated_at TIMESTAMP DEFAULT SYSDATE
);

CREATE SEQUENCE news_seq START WITH 1 INCREMENT BY 1;
```

#### Gallery Table
```sql
CREATE TABLE gallery (
  id NUMBER PRIMARY KEY,
  title VARCHAR2(255) NOT NULL,
  description VARCHAR2(500),
  image VARCHAR2(255) NOT NULL,
  category VARCHAR2(100),
  event_date TIMESTAMP,
  uploaded_by VARCHAR2(100),
  created_at TIMESTAMP DEFAULT SYSDATE,
  updated_at TIMESTAMP DEFAULT SYSDATE
);

CREATE SEQUENCE gallery_seq START WITH 1 INCREMENT BY 1;
```

#### Contact Messages Table
```sql
CREATE TABLE contact_messages (
  id NUMBER PRIMARY KEY,
  name VARCHAR2(100) NOT NULL,
  email VARCHAR2(100) NOT NULL,
  phone VARCHAR2(20),
  subject VARCHAR2(255) NOT NULL,
  message CLOB NOT NULL,
  status VARCHAR2(20) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT SYSDATE,
  updated_at TIMESTAMP DEFAULT SYSDATE
);

CREATE SEQUENCE contact_messages_seq START WITH 1 INCREMENT BY 1;
```

## Installation

```bash
npm install
```

## Running the Server

Development (with auto-reload):
```bash
npm run dev
```

Production:
```bash
npm start
```

The server will run on http://localhost:3000

## API Endpoints

### Authentication
- POST /api/auth/login
- POST /api/auth/register
- GET /api/auth/me

### Students
- GET /api/students
- GET /api/students/:id
- POST /api/students
- PUT /api/students/:id
- DELETE /api/students/:id

### Faculty
- GET /api/faculty
- GET /api/faculty/:id
- POST /api/faculty
- PUT /api/faculty/:id
- DELETE /api/faculty/:id

### Courses
- GET /api/courses
- GET /api/courses/:id
- POST /api/courses
- PUT /api/courses/:id
- DELETE /api/courses/:id

### Departments
- GET /api/departments
- GET /api/departments/:id
- POST /api/departments
- PUT /api/departments/:id
- DELETE /api/departments/:id

### Admissions
- GET /api/admissions
- GET /api/admissions/:id
- POST /api/admissions
- PUT /api/admissions/:id
- DELETE /api/admissions/:id

### News
- GET /api/news
- GET /api/news/:id
- POST /api/news
- PUT /api/news/:id
- DELETE /api/news/:id

### Gallery
- GET /api/gallery
- GET /api/gallery/:id
- POST /api/gallery
- PUT /api/gallery/:id
- DELETE /api/gallery/:id

### Contact
- GET /api/contact
- GET /api/contact/:id
- POST /api/contact
- DELETE /api/contact/:id
