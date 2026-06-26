const oracledb = require('oracledb');
require('dotenv').config({ path: __dirname + '/../.env' });

const dbConfig = {
  user: process.env.DB_USER || 'system',
  password: process.env.DB_PASSWORD || 'oracle',
  connectString: process.env.DB_CONNECTION_STRING || 'localhost:1521/xe'
};

async function runSeed() {
  let connection;
  try {
    console.log('Connecting to Oracle for seeding...');
    connection = await oracledb.getConnection(dbConfig);

    // Insert departments
    await connection.execute(`INSERT INTO departments (id, department_name, head_name, description, total_faculty, total_students, created_at, updated_at)
      VALUES (departments_seq.NEXTVAL, :deptName, :headName, :description, :fac, :stu, SYSDATE, SYSDATE)` ,
      { deptName: 'Computer Science', headName: 'Dr. Ada Lovelace', description: 'CS Department', fac: 10, stu: 200 }
    );

    await connection.execute(`INSERT INTO departments (id, department_name, head_name, description, total_faculty, total_students, created_at, updated_at)
      VALUES (departments_seq.NEXTVAL, :deptName, :headName, :description, :fac, :stu, SYSDATE, SYSDATE)` ,
      { deptName: 'Mathematics', headName: 'Dr. Euclid', description: 'Math Department', fac: 8, stu: 120 }
    );

    // Insert a sample user (admin) and capture id
    const userInsertSql = `INSERT INTO users (id, name, email, phone, password, role, enrollment_number, department_id, created_at, updated_at)
      VALUES (users_seq.NEXTVAL, :userName, :userEmail, :userPhone, :userPassword, :userRole, :enroll, :deptId, SYSDATE, SYSDATE) RETURNING id INTO :outId`;

    const userResult = await connection.execute(userInsertSql,
      { userName: 'Admin User', userEmail: 'admin@example.com', userPhone: '1234567890', userPassword: 'password', userRole: 'admin', enroll: null, deptId: null, outId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } }
    );

    const userId = userResult.outBinds.outId[0];

    // Insert a faculty
    await connection.execute(`INSERT INTO faculty (id, name, email, phone, department_id, specialization, qualification, experience, office_room, bio, photo, created_at, updated_at)
      VALUES (faculty_seq.NEXTVAL, :facName, :facEmail, :facPhone, :facDept, :spec, :qual, :exp, :room, :bio, :photo, SYSDATE, SYSDATE)`,
      { facName: 'Prof. Alan Turing', facEmail: 'alan@uni.edu', facPhone: '0987654321', facDept: 1, spec: 'Algorithms', qual: 'PhD', exp: 15, room: 'B101', bio: 'Pioneer of computing', photo: null }
    );

    // Insert a course
    await connection.execute(`INSERT INTO courses (id, course_code, course_name, department_id, credits, description, created_at, updated_at)
      VALUES (courses_seq.NEXTVAL, :code, :courseName, :courseDept, :credits, :courseDesc, SYSDATE, SYSDATE)`,
      { code: 'CS101', courseName: 'Intro to Computer Science', courseDept: 1, credits: 4, courseDesc: 'Basics of CS' }
    );

    // Insert a student linked to the user we just created
    await connection.execute(`INSERT INTO students (id, user_id, enrollment_number, department_id, semester_number, gpa, date_of_admission, status, created_at, updated_at)
      VALUES (students_seq.NEXTVAL, :userId, :enrollNum, :studDept, :sem, :gpa, SYSDATE, :status, SYSDATE, SYSDATE)`,
      { userId: userId, enrollNum: 'ENR001', studDept: 1, sem: 1, gpa: 0.0, status: 'active' }
    );

    // Insert a news item
    await connection.execute(`INSERT INTO news (id, title, content, author, featured_image, published_at, created_at, updated_at)
      VALUES (news_seq.NEXTVAL, :newsTitle, :newsContent, :newsAuthor, :newsImage, SYSDATE, SYSDATE, SYSDATE)`,
      { newsTitle: 'Welcome', newsContent: 'Welcome to the new portal', newsAuthor: 'Admin', newsImage: null }
    );

    // Insert gallery entry
    await connection.execute(`INSERT INTO gallery (id, title, image_path, category, created_at)
      VALUES (gallery_seq.NEXTVAL, :gTitle, :gPath, :gCategory, SYSDATE)`,
      { gTitle: 'Campus', gPath: '/images/campus.jpg', gCategory: 'general' }
    );

    await connection.commit();
    console.log('Seeding completed successfully.');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    if (connection) {
      try { await connection.close(); } catch (e) { }
    }
    process.exit(0);
  }
}

if (require.main === module) {
  runSeed();
} else {
  module.exports = { runSeed };
}
