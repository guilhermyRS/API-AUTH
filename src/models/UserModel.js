const db = require("../database/database.js");

class UserModel {
    createUser(user, callback) {
        const query = "INSERT INTO users (name, email, pass) VALUES (?, ?, ?)";
        db.run(query, user, function (err) {
            callback(err, this ? this.lastID : null);
        });
    }

    getAllUsers(callback) {
        db.all("SELECT * FROM users", [], function (err, users) {
            callback(err, users);
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
}

module.exports = new UserModel();