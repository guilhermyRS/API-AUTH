const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbFilePath = path.join(__dirname, "database.sqlite");

const db = new sqlite3.Database(dbFilePath, (err) => {
    if (err) console.error("Erro ao conectar ao banco de dados:", err.message);
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        pass TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`);

    function insertUser(name, email, pass) {
        db.run(`INSERT INTO users (name, email, pass) VALUES (?, ?, ?)`, [name, email, pass], function (err) {
            if (err && err.code !== "SQLITE_CONSTRAINT") {
                console.error("Erro ao inserir usuário:", err.message);
            }
        });
    }

    insertUser("Guilhermy Rodrigues", "developerguilhermy@gmail.com", "unicatolica@53120");
});

module.exports = db;