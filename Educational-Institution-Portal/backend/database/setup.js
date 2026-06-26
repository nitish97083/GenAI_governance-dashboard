const oracledb = require('oracledb');
require('dotenv').config({ path: __dirname + '/../.env' });

const dbConfig = {
  user: process.env.DB_USER || 'system',
  password: process.env.DB_PASSWORD || 'oracle',
  connectString: process.env.DB_CONNECTION_STRING || 'localhost:1521/xe'
};

async function run() {
  let connection;
  try {
    console.log('Connecting to Oracle...');
    connection = await oracledb.getConnection(dbConfig);
    console.log('Connected. Creating tables and sequences...');

    const stmts = [
      `CREATE TABLE users (
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
       )`,
      `CREATE SEQUENCE users_seq START WITH 1 INCREMENT BY 1`,

      `CREATE TABLE departments (
         id NUMBER PRIMARY KEY,
         department_name VARCHAR2(100) NOT NULL,
         head_name VARCHAR2(100),
         description VARCHAR2(500),
         total_faculty NUMBER DEFAULT 0,
         total_students NUMBER DEFAULT 0,
         created_at TIMESTAMP DEFAULT SYSDATE,
         updated_at TIMESTAMP DEFAULT SYSDATE
       )`,
      `CREATE SEQUENCE departments_seq START WITH 1 INCREMENT BY 1`,

      `CREATE TABLE faculty (
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
       )`,
      `CREATE SEQUENCE faculty_seq START WITH 1 INCREMENT BY 1`,

      `CREATE TABLE students (
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
       )`,
      `CREATE SEQUENCE students_seq START WITH 1 INCREMENT BY 1`,

      `CREATE TABLE courses (
         id NUMBER PRIMARY KEY,
         course_code VARCHAR2(20) UNIQUE NOT NULL,
         course_name VARCHAR2(100) NOT NULL,
         department_id NUMBER NOT NULL,
         credits NUMBER,
         description VARCHAR2(500),
         created_at TIMESTAMP DEFAULT SYSDATE,
         updated_at TIMESTAMP DEFAULT SYSDATE
       )`,
      `CREATE SEQUENCE courses_seq START WITH 1 INCREMENT BY 1`,

      `CREATE TABLE news (
         id NUMBER PRIMARY KEY,
         title VARCHAR2(200) NOT NULL,
         content VARCHAR2(2000),
         author VARCHAR2(100),
         featured_image VARCHAR2(255),
         published_at TIMESTAMP,
         created_at TIMESTAMP DEFAULT SYSDATE,
         updated_at TIMESTAMP DEFAULT SYSDATE
       )`,
      `CREATE SEQUENCE news_seq START WITH 1 INCREMENT BY 1`,

      `CREATE TABLE gallery (
         id NUMBER PRIMARY KEY,
         title VARCHAR2(100),
         image_path VARCHAR2(255) NOT NULL,
         category VARCHAR2(50),
         created_at TIMESTAMP DEFAULT SYSDATE
       )`,
      `CREATE SEQUENCE gallery_seq START WITH 1 INCREMENT BY 1`
    ];

    for (const sql of stmts) {
      try {
        await connection.execute(sql);
        console.log('Executed:', sql.split('\n')[0].trim());
      } catch (err) {
        if (err && err.errorNum === 955) { // ORA-00955: name is already used by an existing object
          console.log('Already exists:', (sql.match(/CREATE TABLE|CREATE SEQUENCE/) || [])[0]);
        } else {
          console.error('Error executing statement:', err.message);
        }
      }
    }

    await connection.commit();
    console.log('Schema creation completed.');
  } catch (err) {
    console.error('Setup failed:', err);
  } finally {
    if (connection) {
      try { await connection.close(); } catch (e) { }
    }
    process.exit(0);
  }
}

run();
