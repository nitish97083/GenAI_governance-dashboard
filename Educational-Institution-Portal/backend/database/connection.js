const oracledb = require('oracledb');
const config = require('../config');

let connectionPool;

async function initializePool() {
  try {
    // ensure oracledb defaults
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    oracledb.autoCommit = true;

    if (!connectionPool) {
      connectionPool = await oracledb.createPool({
        user: config.database.user,
        password: config.database.password,
        connectString: config.database.connectString,
        max: 10,
        min: 2,
        increment: 1
      });
      console.log('Oracle Connection Pool initialized');
    }
    return connectionPool;
  } catch (err) {
    console.error('Error initializing connection pool:', err);
    throw err;
  }
}

async function getConnection() {
  try {
    if (!connectionPool) {
      await initializePool();
    }
    return await connectionPool.getConnection();
  } catch (err) {
    console.error('Error getting connection:', err);
    throw err;
  }
}

async function closeConnection(connection) {
  try {
    if (connection) {
      await connection.close();
    }
  } catch (err) {
    console.error('Error closing connection:', err);
  }
}

async function executeQuery(sql, params = []) {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(sql, params, { outFormat: oracledb.OUT_FORMAT_OBJECT });
    return result;
  } catch (err) {
    console.error('Error executing query:', err);
    throw err;
  } finally {
    await closeConnection(connection);
  }
}

module.exports = {
  initializePool,
  getConnection,
  closeConnection,
  executeQuery
};
