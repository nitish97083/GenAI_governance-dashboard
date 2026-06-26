const oracledb = require('oracledb');
const config = require('./config');

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

async function testConnection() {
  console.log(`\n${colors.blue}========================================`);
  console.log(`Oracle Database Connection Test`);
  console.log(`========================================${colors.reset}\n`);

  const dbConfig = config.database;

  console.log(`${colors.yellow}Connection Details:${colors.reset}`);
  console.log(`  User: ${dbConfig.user}`);
  console.log(`  Connection String: ${dbConfig.connectString}`);
  console.log(`  Password: ${'*'.repeat(dbConfig.password.length)}\n`);

  try {
    console.log(`${colors.blue}Attempting connection...${colors.reset}`);
    
    const connection = await oracledb.getConnection(dbConfig);
    
    console.log(`${colors.green}✓ Connection Successful!${colors.reset}\n`);

    // Test 1: Check database version
    console.log(`${colors.yellow}Test 1: Checking Database Version${colors.reset}`);
    const versionResult = await connection.execute('SELECT * FROM v$version WHERE ROWNUM = 1');
    console.log(`  Version: ${versionResult.rows[0][0]}\n`);

    // Test 2: Check tables
    console.log(`${colors.yellow}Test 2: Checking Project Tables${colors.reset}`);
    const tablesResult = await connection.execute(
      `SELECT table_name FROM user_tables 
       WHERE table_name IN ('USERS', 'DEPARTMENTS', 'FACULTY', 'STUDENTS', 'COURSES', 'NEWS', 'GALLERY')
       ORDER BY table_name`
    );
    
    if (tablesResult.rows.length > 0) {
      console.log(`  Found ${colors.green}${tablesResult.rows.length}${colors.reset} tables:`);
      tablesResult.rows.forEach(row => {
        console.log(`    ✓ ${row[0]}`);
      });
    } else {
      console.log(`  ${colors.red}No project tables found.${colors.reset}`);
      console.log(`  Run this command to create tables:`);
      console.log(`  ${colors.yellow}sqlplus system/oracle@localhost:1521/xe @backend/database/setup.sql${colors.reset}\n`);
    }

    // Test 3: Check sequences
    console.log(`\n${colors.yellow}Test 3: Checking Sequences${colors.reset}`);
    const seqResult = await connection.execute(
      `SELECT sequence_name FROM user_sequences 
       WHERE sequence_name LIKE '%_SEQ'
       ORDER BY sequence_name`
    );
    
    if (seqResult.rows.length > 0) {
      console.log(`  Found ${colors.green}${seqResult.rows.length}${colors.reset} sequences`);
    } else {
      console.log(`  ${colors.yellow}No sequences found${colors.reset}`);
    }

    // Test 4: Count sample data
    console.log(`\n${colors.yellow}Test 4: Checking Sample Data${colors.reset}`);
    try {
      const deptResult = await connection.execute('SELECT COUNT(*) as dept_count FROM departments');
      const courseResult = await connection.execute('SELECT COUNT(*) as course_count FROM courses');
      const newsResult = await connection.execute('SELECT COUNT(*) as news_count FROM news');
      
      console.log(`  Departments: ${deptResult.rows[0].DEPT_COUNT}`);
      console.log(`  Courses: ${courseResult.rows[0].COURSE_COUNT}`);
      console.log(`  News Articles: ${newsResult.rows[0].NEWS_COUNT}\n`);
    } catch (err) {
      console.log(`  ${colors.yellow}Tables exist but may be empty${colors.reset}\n`);
    }

    // Test 5: Connection pool test
    console.log(`${colors.yellow}Test 5: Testing Connection Pool${colors.reset}`);
    try {
      oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
      
      const pool = await oracledb.createPool({
        user: dbConfig.user,
        password: dbConfig.password,
        connectString: dbConfig.connectString,
        max: 5,
        min: 1,
        increment: 1
      });
      
      console.log(`  ${colors.green}✓ Connection Pool Created Successfully${colors.reset}`);
      
      // Get a connection from pool
      const poolConnection = await pool.getConnection();
      console.log(`  ${colors.green}✓ Got Connection from Pool${colors.reset}`);
      
      // Release connection
      await poolConnection.close();
      console.log(`  ${colors.green}✓ Released Connection Back to Pool${colors.reset}\n`);
      
      // Close pool
      await pool.close();
    } catch (err) {
      console.log(`  ${colors.red}✗ Pool test failed: ${err.message}${colors.reset}\n`);
    }

    // Close connection
    await connection.close();

    // Summary
    console.log(`${colors.green}========================================`);
    console.log(`✓ All tests passed!`);
    console.log(`Database is ready to use.`);
    console.log(`========================================${colors.reset}\n`);

    console.log(`${colors.yellow}Next Steps:${colors.reset}`);
    console.log(`1. Start backend server: ${colors.blue}npm run dev${colors.reset}`);
    console.log(`2. Start frontend server: ${colors.blue}cd frontend && npm start${colors.reset}`);
    console.log(`3. Access application: ${colors.blue}http://localhost:4200${colors.reset}\n`);

  } catch (err) {
    console.error(`\n${colors.red}========================================`);
    console.error(`✗ Connection Failed`);
    console.error(`========================================${colors.reset}\n`);
    console.error(`${colors.red}Error: ${err.message}${colors.reset}\n`);

    if (err.message.includes('ORA-12514')) {
      console.log(`${colors.yellow}Troubleshooting:${colors.reset}`);
      console.log(`1. Check if Oracle service is running:`);
      console.log(`   ${colors.blue}net start OracleServiceXE${colors.reset}`);
      console.log(`2. Verify connection string: ${colors.blue}localhost:1521/xe${colors.reset}`);
      console.log(`3. Check listener status: ${colors.blue}lsnrctl status${colors.reset}\n`);
    } else if (err.message.includes('ORA-01017')) {
      console.log(`${colors.yellow}Troubleshooting:${colors.reset}`);
      console.log(`1. Check username and password in .env file`);
      console.log(`2. Default credentials: system / oracle\n`);
    } else {
      console.log(`${colors.yellow}Troubleshooting:${colors.reset}`);
      console.log(`1. Verify Oracle is installed and running`);
      console.log(`2. Check .env file for correct database credentials`);
      console.log(`3. Review DATABASE_CONNECTION.md for detailed setup steps\n`);
    }

    process.exit(1);
  }
}

// Run the test
testConnection();
