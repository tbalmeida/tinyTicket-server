const mysql = require('mysql')
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USR,
  password: process.env.PASSWD,
  database: process.env.DB
})

module.exports = pool;