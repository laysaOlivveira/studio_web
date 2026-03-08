const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "221080031@Uepb",
  database: "studio_funcional",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection;