require('dotenv').config();

module.exports = {
  // Database Configuration
  database: {
    user: process.env.DB_USER || 'system',
    password: process.env.DB_PASSWORD || 'oracle',
    connectString: process.env.DB_CONNECTION_STRING || 'localhost:1521/xe'
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    expiresIn: '24h'
  },

  // Server Configuration
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development'
  },

  // CORS Configuration
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    credentials: true
  }
};
