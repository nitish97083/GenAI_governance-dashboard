# Educational Institution Portal

A comprehensive web-based educational institution management system built with Angular, Node.js/Express, and Oracle Database.

## Project Structure

```
Educational-Institution-Portal/
├── frontend/          # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Reusable components
│   │   │   ├── pages/        # Page components
│   │   │   ├── services/     # API services
│   │   │   ├── models/       # TypeScript models/interfaces
│   │   │   ├── app.component.*
│   │   │   └── app.routes.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.scss
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
├── backend/           # Node.js/Express backend
│   ├── routes/        # API routes
│   ├── middleware/    # Authentication middleware
│   ├── database/      # Database connection
│   ├── server.js
│   ├── config.js
│   ├── package.json
│   ├── README.md
│   └── .env.example
│
└── README.md
```

## Features

### Frontend (Angular 17)
- **Responsive Design**: Mobile-first, fully responsive UI
- **Pages & Components**:
  - Home - Hero section, features, news, statistics
  - About - Institution information and values
  - Academics - Departments and courses
  - Admissions - Application form and process
  - Faculty - Directory of faculty members
  - Students - Student portal and directory
  - Gallery - Image gallery with filtering
  - News - Latest news and updates
  - Contact - Contact form and information
  - Login/Register - User authentication
  - Admin Dashboard - Management panel

### Backend (Node.js/Express)
- **RESTful API** with full CRUD operations
- **Oracle Database Integration** for data persistence
- **JWT Authentication** for secure API endpoints
- **Role-based Authorization** (Admin, Faculty, Student, Parent)
- **API Endpoints** for:
  - Authentication (Login, Register)
  - Students Management
  - Faculty Management
  - Courses Management
  - Departments Management
  - Admissions Processing
  - News Management
  - Gallery Management
  - Contact Messages

### Database (Oracle)
- Complete relational database schema
- 9 main tables: Users, Students, Faculty, Courses, Departments, Admissions, News, Gallery, Contact Messages
- Automatic timestamp tracking
- Sequence-based primary keys

## Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)
- Oracle Database (v11g+) or Oracle XE

### Frontend Setup

```bash
cd frontend
npm install
ng serve
```

The frontend will be available at `http://localhost:4200`

### Backend Setup

1. **Configure Environment Variables**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your Oracle credentials
   ```

2. **Create Database Tables**
   - Run the SQL scripts provided in `backend/README.md`
   - Execute all CREATE TABLE and SEQUENCE statements in Oracle

3. **Install Dependencies and Start Server**
   ```bash
   npm install
   npm run dev
   ```

The backend will be available at `http://localhost:3000`

## Configuration

### Frontend Configuration
- API Base URL: `http://localhost:3000/api` (defined in `api.service.ts`)
- Modify proxy configuration in `proxy.conf.json` if needed

### Backend Configuration
Create a `.env` file in the backend directory:

```
DB_USER=system
DB_PASSWORD=oracle
DB_CONNECTION_STRING=localhost:1521/xe
PORT=3000
NODE_ENV=development
JWT_SECRET=your-secret-key-change-in-production
CORS_ORIGIN=http://localhost:4200
```

## Usage

### User Roles

1. **Student**
   - View courses and faculty
   - Apply for admissions
   - Access student portal
   - Send contact messages

2. **Faculty**
   - Manage assigned courses
   - View student information
   - Access faculty portal

3. **Admin**
   - Full access to admin dashboard
   - Manage students, faculty, courses
   - Manage admissions and approvals
   - Post news and updates
   - Manage gallery
   - View contact messages

4. **Parent**
   - View student progress
   - Send contact messages

### Login Credentials (Default)

Admin: `admin@institution.edu` / `password`
Faculty: `faculty@institution.edu` / `password`
Student: `student@institution.edu` / `password`

(These are sample credentials. Change them in production)

## API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### CRUD Endpoints

#### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

#### Faculty
- `GET /api/faculty` - Get all faculty
- `GET /api/faculty/:id` - Get faculty by ID
- `POST /api/faculty` - Create faculty
- `PUT /api/faculty/:id` - Update faculty
- `DELETE /api/faculty/:id` - Delete faculty

#### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

#### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/:id` - Get department by ID
- `POST /api/departments` - Create department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department

#### Admissions
- `GET /api/admissions` - Get all admissions
- `GET /api/admissions/:id` - Get admission by ID
- `POST /api/admissions` - Submit admission application
- `PUT /api/admissions/:id` - Update admission status
- `DELETE /api/admissions/:id` - Delete admission

#### News
- `GET /api/news` - Get all news
- `GET /api/news/:id` - Get news by ID
- `POST /api/news` - Create news
- `PUT /api/news/:id` - Update news
- `DELETE /api/news/:id` - Delete news

#### Gallery
- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery/:id` - Get gallery item by ID
- `POST /api/gallery` - Create gallery item
- `PUT /api/gallery/:id` - Update gallery item
- `DELETE /api/gallery/:id` - Delete gallery item

#### Contact Messages
- `POST /api/contact` - Submit contact message
- `GET /api/contact` - Get all messages (Admin only)
- `GET /api/contact/:id` - Get message by ID (Admin only)
- `DELETE /api/contact/:id` - Delete message (Admin only)

## Technologies Used

### Frontend
- Angular 17
- TypeScript
- RxJS
- SCSS

### Backend
- Node.js
- Express.js
- OracleDB
- JWT (jsonwebtoken)
- bcryptjs (for password hashing)

### Database
- Oracle Database 11g+ / Oracle XE

## Development

### Frontend Development
```bash
cd frontend
ng serve --open
```

### Backend Development
```bash
cd backend
npm run dev
```

### Building for Production

Frontend:
```bash
cd frontend
ng build --configuration production
```

Backend:
```bash
cd backend
npm start
```

## Future Enhancements

- [ ] Student grades and performance tracking
- [ ] Online exam system
- [ ] Attendance management
- [ ] Fee management system
- [ ] Email notifications
- [ ] SMS integration
- [ ] Advanced reporting
- [ ] Mobile app (React Native)
- [ ] Video conferencing integration
- [ ] AI-powered chatbot

## Security Considerations

- Change JWT secret in production
- Implement HTTPS
- Use environment variables for sensitive data
- Implement rate limiting
- Add CSRF protection
- Implement proper password hashing
- Regular security audits
- SQL injection prevention (using parameterized queries)
- XSS protection

## Support

For issues and feature requests, please create an issue in the repository.

## License

This project is licensed under the MIT License.

## Author

Educational Institution Development Team

---

**Note**: This is a development version. For production deployment, implement proper security measures, error handling, and performance optimizations.
