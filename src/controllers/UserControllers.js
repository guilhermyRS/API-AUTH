const UserModel = require("../models/UserModel.js");

class UserController {
    createUser(req, res) {
        const {
            name,
            email,
            pass
        } = req.body;

        if (!name || !email || !pass || name.trim() === "" || email.trim() === "" || pass.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Nome, email e senha são obrigatórios."
            });
        }

        try {
            UserModel.createUser([name, email, pass], (err, lastID) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Erro ao criar usuário. Tente novamente."
                    });
                }

                return res.status(201).json({
                    success: true,
                    message: "Usuário criado com sucesso.",
                    idUsuario: lastID
                });
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Erro inesperado: " + error.message
            });
        }
    }

    getAllUsers(req, res) {
        try {
            UserModel.getAllUsers((err, rows) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Erro ao buscar usuários. Tente novamente."
                    });
                }

                return res.json({
                    success: true,
                    message: "Usuários listados com sucesso.",
                    data: rows
                });
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Erro inesperado: " + error.message
            });
        }
    }

    updateUser(req, res) {
        const {
            id
        } = req.params;
        const {
            name,
            email,
            pass
        } = req.body;

        if (!name || !email || !pass || name.trim() === "" || email.trim() === "" || pass.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Nome, email e senha são obrigatórios."
            });
        }

        UserModel.updateUser(id, [name, email, pass], (err, changes) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Erro ao atualizar usuário. Tente novamente."
                });
            }

            if (changes === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Usuário não encontrado."
                });
            }

            return res.json({
                success: true,
                message: "Usuário atualizado com sucesso.",
                data: {
                    id,
                    name,
                    email,
                    pass
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
                return res.status(500).json({
                    success: false,
                    message: "Erro ao deletar usuário. Tente novamente."
                });
            }

            if (changes === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Usuário não encontrado."
                });
            }

            return res.json({
                success: true,
                message: `Usuário com ID ${id} deletado com sucesso.`
            });
        });
    }
}

module.exports = new UserController();