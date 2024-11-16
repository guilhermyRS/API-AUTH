const db = require("../Database/database.js");

class UserModel {
    createUser(user, callback) {
        const query = "INSERT INTO users (name, email, pass) VALUES (?, ?, ?)";
        db.run(query, user, function (err) {
            callback(err, this ? this.lastID : null);
        });
    }

    getAllUsers(callback) {
        const query = "SELECT id, name, email FROM users";
        db.all(query, [], (err, rows) => {
            callback(err, rows);
        });
    }

    updateUser(id, user, callback) {
        const query = "UPDATE users SET name = ?, email = ?, pass = ? WHERE id = ?";
        db.run(query, [...user, id], function (err) {
            callback(err, this.changes);
        });
    }

    deleteUser(id, callback) {
        const query = "DELETE FROM users WHERE id = ?";
        db.run(query, id, function (err) {
            callback(err, this.changes);
        });
    }

    validateUser(email, callback) {
        const query = "SELECT id, email, pass FROM users WHERE email = ?";
        db.get(query, [email], (err, row) => {
            callback(err, row);
        });
    }
}

module.exports = new UserModel();