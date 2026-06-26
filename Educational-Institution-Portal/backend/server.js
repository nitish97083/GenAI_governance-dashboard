require('dotenv').config();
const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Oracle DB Configuration
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;

// Database Connection Pool
let connectionPool;

async function initializeConnectionPool() {
  try {
    connectionPool = await oracledb.createPool({
      user: process.env.DB_USER || 'system',
      password: process.env.DB_PASSWORD || 'oracle',
      connectString: process.env.DB_CONNECTION_STRING || 'localhost:1521/xe'
    });
    console.log('Oracle Database Connection Pool Created Successfully');
  } catch (err) {
    console.error('Error creating connection pool:', err);
    process.exit(1);
  }
}

// Routes
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const facultyRoutes = require('./routes/faculty');
const courseRoutes = require('./routes/courses');
const departmentRoutes = require('./routes/departments');
const admissionRoutes = require('./routes/admissions');
const newsRoutes = require('./routes/news');
const galleryRoutes = require('./routes/gallery');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal Server Error',
    error: err.message 
  });
});

// Start Server
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await initializeConnectionPool();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API base URL: http://localhost:${PORT}/api`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

// Export for accessing connection pool in routes
module.exports = { app, connectionPool: () => connectionPool };

startServer();
