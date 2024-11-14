class UserModel {
    createUser(user, callback) {
        const query = "INSERT INTO users (name, email, pass) VALUES (?, ?, ?)";
        db.run(query, user, function (err) {
            callback(err, this ? this.lastID : null);
        });
    }
    getAllUsers() {}
    updateUser() {}
    deleteUser() {}
}

module.exports = new UserModel();