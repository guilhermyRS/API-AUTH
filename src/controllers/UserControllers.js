class UserController {
    createUser(req, res) {
        const {
            name,
            email,
            pass
        } = req.body;

        if (!name || !email || !pass || name.trim() === "" || email.trim() === "" || pass.trim() === "") {
            res.status(400).json({
                success: false,
                message: "Os campos nome, email e pass, são requiridos."
            });
        }
        try {
            UserModel.createUser([name, email, pass], (err, lastID) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: "Internal Server Error"
                    });
                }

                res.status(201).json({
                    success: true,
                    message: "Cadastro de usuário realizado com sucesso.",
                    idUsuario: lastID
                });
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    getAllUsers(req, res) {
        try {
            UserModel.getAllUsers((err, rows) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: "Internal Server Error"
                    });
                }
                res.json({
                    success: true,
                    message: "Usuários retornado com sucesso.",
                    data: rows
                });
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    UpdateUser(req, res) {
        const {
            id
        } = req.params;

        const {
            name,
            email,
            pass
        } = req.body;

        if (!name || !email || !pass || name.trim() === "" || email.trim() === "" || pass.trim() === "") {
            res.status(400).json({
                success: false,
                message: "Os campos nome, email e pass, são requiridos."
            });
        }
        userModel.updateuser(id, [name, email, pass], (err, changes) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                });
            }
            if (changes === 0) {
                res.status(404).json({
                    success: false,
                    message: "Usuário não encontrado."
                })
            }
            res.json({
                succes: true,
                message: "Usuário atualizado com sucesso.",
                data: {
                    id: id,
                    name: name,
                    email: email,
                    pass: pass
                }
            });
        });
    }

    deleteUser(req, res) {
        const {
            id
        } = req.params;

        UserModel.deleteUser(id, (err, changes) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: "Internal Server Error"
                });
            }
            if (changes === 0) {
                res.status(404).json({
                    success: false,
                    message: "Usuário não encontrado."
                })
            }
            res.json({
                success: true,
                message: `Usuário ${id} deletado com sucesso.`
            });
        });
    }
}

module.exports = new UserController();