const Database = require("better-sqlite3");
const path = require("path");

// Database file ka path set karna
const dbPath = path.resolve(__dirname, "../tasks.db");

// SQLite file create / connect
const db = new Database(dbPath);

module.exports = db;
