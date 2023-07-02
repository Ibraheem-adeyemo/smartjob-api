require('dotenv').config();
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST
const dbPort = process.env.DB_PORT
const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbDialect = process.env.DB_DIALECT

const testDbPassword = process.env.TEST_DB_PASSWORD
const testDbHost = process.env.TEST_DB_HOST 
const testDbPort = process.env.TEST_DB_PORT
const testDbName = process.env.TEST_DB_NAME
const testDbUser = process.env.TEST_DB_USER

module.exports = {
  development: {
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    dialect: 'postgres'
  },
  test: {
    username: testDbUser,
    password: testDbPassword,
    database: testDbName,
    host: testDbHost,
    dialect: dbDialect,
    port:testDbPort
  },
  production: {
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    dialect: 'postgres'
  }
}
