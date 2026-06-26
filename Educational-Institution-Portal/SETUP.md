# Educational Institution Portal - Setup Guide

## Prerequisites

- **Node.js** (v18+ recommended) - [Download](https://nodejs.org/)
- **Oracle Database** (11g XE or later) - [Download](https://www.oracle.com/database/technologies/xe-downloads.html)
- **Angular CLI** - Install globally: `npm install -g @angular/cli`
- **Git** - For version control

## Project Setup Steps

### 1. Backend Setup

#### Step 1.1: Install Backend Dependencies

```bash
cd Educational-Institution-Portal/backend
npm install
```

#### Step 1.2: Configure Environment Variables

Create or update the `.env` file in the backend directory with your Oracle database credentials:

```env
# Database Configuration
DB_USER=system
DB_PASSWORD=your_oracle_password
DB_CONNECTION_STRING=localhost:1521/xe

# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-secret-key-change-in-production

# CORS Configuration
CORS_ORIGIN=http://localhost:4200
```

#### Step 1.3: Setup Oracle Database

1. **Start Oracle Database:**
   - On Windows: Start the Oracle service from Services
   - Verify connection with SQL*Plus

2. **Create Database Tables:**
   
   Connect to your Oracle database and execute the SQL scripts:

   ```sql
   -- Create Users Table
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
   
   -- Create Departments Table
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
   
   -- Create Faculty Table
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
   
   -- Create Students Table
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
   
   -- Create Courses Table
   CREATE TABLE courses (
     id NUMBER PRIMARY KEY,
     course_code VARCHAR2(20) UNIQUE NOT NULL,
     course_name VARCHAR2(100) NOT NULL,
     department_id NUMBER NOT NULL,
     credits NUMBER,
     description VARCHAR2(500),
     created_at TIMESTAMP DEFAULT SYSDATE,
     updated_at TIMESTAMP DEFAULT SYSDATE
   );
   
   CREATE SEQUENCE courses_seq START WITH 1 INCREMENT BY 1;
   
   -- Create News Table
   CREATE TABLE news (
     id NUMBER PRIMARY KEY,
     title VARCHAR2(200) NOT NULL,
     content VARCHAR2(2000),
     author VARCHAR2(100),
     featured_image VARCHAR2(255),
     published_at TIMESTAMP,
     created_at TIMESTAMP DEFAULT SYSDATE,
     updated_at TIMESTAMP DEFAULT SYSDATE
   );
   
   CREATE SEQUENCE news_seq START WITH 1 INCREMENT BY 1;
   
   -- Create Gallery Table
   CREATE TABLE gallery (
     id NUMBER PRIMARY KEY,
     title VARCHAR2(100),
     image_path VARCHAR2(255) NOT NULL,
     category VARCHAR2(50),
     created_at TIMESTAMP DEFAULT SYSDATE
   );
   
   CREATE SEQUENCE gallery_seq START WITH 1 INCREMENT BY 1;
   ```

#### Step 1.4: Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# OR Production mode
npm start
```

Backend will be available at: `http://localhost:3000`

---

### 2. Frontend Setup

#### Step 2.1: Install Frontend Dependencies

```bash
cd Educational-Institution-Portal/frontend
npm install
```

#### Step 2.2: Configure API Endpoint

Update `src/environments/environment.ts` with the backend API URL:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

For production (`src/environments/environment.prod.ts`):

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-production-api.com/api'
};
```

#### Step 2.3: Start Development Server

```bash
ng serve
# OR
npm start
```

Frontend will be available at: `http://localhost:4200`

---

### 3. Run Both Simultaneously (Optional)

Create a root `start-all.bat` (Windows) or `start-all.sh` (Mac/Linux) in the project root:

**Windows (start-all.bat):**
```batch
@echo off
start cmd /k "cd backend && npm run dev"
start cmd /k "cd frontend && npm start"
```

**Mac/Linux (start-all.sh):**
```bash
#!/bin/bash
cd backend && npm run dev &
cd ../frontend && npm start &
```

Run with:
```bash
# Windows
start-all.bat

# Mac/Linux
chmod +x start-all.sh
./start-all.sh
```

---

## Project Structure Overview

```
Educational-Institution-Portal/
├── backend/              # Node.js/Express API
│   ├── routes/           # API endpoints
│   ├── middleware/       # Auth & validation middleware
│   ├── database/         # DB connection setup
│   ├── config.js         # Configuration
│   ├── server.js         # Express server
│   ├── package.json
│   └── .env              # Environment variables
│
├── frontend/             # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/  # Reusable UI components
│   │   │   ├── pages/       # Page components
│   │   │   ├── services/    # API service layer
│   │   │   └── models/      # TypeScript interfaces
│   │   ├── environments/    # Environment config
│   │   └── index.html
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
└── SETUP.md              # This file
```

---

## Available API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/students` - Get all students
- `GET /api/faculty` - Get all faculty
- `GET /api/courses` - Get all courses
- `GET /api/departments` - Get all departments
- `GET /api/news` - Get news articles
- `GET /api/gallery` - Get gallery images
- `POST /api/contact` - Submit contact form

---

## Troubleshooting

### Oracle Connection Issues
- Verify Oracle service is running
- Check database credentials in `.env`
- Ensure connection string format: `hostname:port/service_name`

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Angular Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Clear Angular cache
ng cache clean
```

### CORS Errors
- Update `CORS_ORIGIN` in backend `.env`
- Ensure frontend is running on `http://localhost:4200`

---

## Development Commands

### Backend
```bash
npm install          # Install dependencies
npm run dev          # Start with auto-reload
npm start            # Start production server
npm test             # Run tests (if configured)
```

### Frontend
```bash
npm install          # Install dependencies
npm start            # Start dev server
ng build             # Build for production
ng test              # Run unit tests
ng lint              # Run linter
```

---

## Production Deployment

### Backend Deployment
1. Update `.env` with production database credentials
2. Set `NODE_ENV=production`
3. Update `JWT_SECRET` with a secure random string
4. Deploy to server (Heroku, AWS, DigitalOcean, etc.)

### Frontend Deployment
1. Build: `ng build --configuration production`
2. Update `environment.prod.ts` with production API URL
3. Deploy `dist/` folder to hosting (Netlify, Vercel, AWS S3, etc.)

---

## Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Express.js Guide](https://expressjs.com/)
- [Oracle Database Documentation](https://docs.oracle.com/)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/nodejs-performance/)

---

## Support

For issues or questions, please refer to the individual README files in the `backend/` and `frontend/` directories.
