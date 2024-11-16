const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve('./vulnerable.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(
        `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL
        )`
    );

    db.run(`INSERT INTO users (username, password) VALUES ('admin', '2a48fb31a26d0d68ef46e4f6c1ca8dd8')`);
    db.run(`INSERT INTO users (username, password) VALUES ('user', '2a48fb31a26d0d68ef46e4f6c1ca8dd8')`);
});

module.exports = db;
