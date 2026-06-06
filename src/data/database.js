const Database = require("better-sqlite3");

const db = new Database("books.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'To Read',
    rating INTEGER
  )
`);

module.exports = db;