const UserModel = require("../Models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
    async createUser(req, res) {
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
            const hashedPass = await bcrypt.hash(pass, 10);
            UserModel.createUser([name, email, hashedPass], (err, lastID) => {
                if (err) return res.status(500).json({
                    success: false,
                    message: "Erro ao criar usuário. Tente novamente."
                });
                return res.status(201).json({
                    success: true,
                    message: "Usuário criado com sucesso.",
                    data: {
                        idUsuario: lastID
                    }
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
                if (err) return res.status(500).json({
                    success: false,
                    message: "Erro ao buscar usuários. Tente novamente."
                });
                return res.status(200).json({
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

    async updateUser(req, res) {
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

        try {
            const hashedPass = await bcrypt.hash(pass, 10);
            UserModel.updateUser(id, [name, email, hashedPass], (err, changes) => {
                if (err) return res.status(500).json({
                    success: false,
                    message: "Erro ao atualizar usuário. Tente novamente."
                });

                if (changes === 0) return res.status(404).json({
                    success: false,
                    message: "Usuário não encontrado."
                });
                return res.status(200).json({
                    success: true,
                    message: "Usuário atualizado com sucesso.",
                    data: {
                        id,
                        name,
                        email
                    }
                });
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Erro inesperado: " + error.message
            });
        }
    }

    deleteUser(req, res) {
        const {
            id
        } = req.params;

        UserModel.deleteUser(id, (err, changes) => {
            if (err) return res.status(500).json({
                success: false,
                message: "Erro ao deletar usuário. Tente novamente."
            });

            if (changes === 0) return res.status(404).json({
                success: false,
                message: "Usuário não encontrado."
            });
            return res.status(200).json({
                success: true,
                message: `Usuário com ID ${id} deletado com sucesso.`
            });
        });
    }

    async validationUser(req, res) {
        const {
            email,
            pass
        } = req.body;

        if (!email || !pass || email.trim() === "" || pass.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Email e senha são obrigatórios."
            });
        }

        try {
            UserModel.validateUser(email, pass, async (err, user) => {
                if (err) return res.status(500).json({
                    success: false,
                    message: "Erro ao validar o usuário."
                });

                if (!user) return res.status(401).json({
                    success: false,
                    message: "Credenciais inválidas."
                });

                const isValid = await bcrypt.compare(pass, user.pass);
                if (!isValid) return res.status(401).json({
                    success: false,
                    message: "Credenciais inválidas."
                });

                const token = jwt.sign({
                    id: user.id,
                    email: user.email
                }, process.env.SECRET_KEY, {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    success: true,
                    message: "Login realizado com sucesso!",
                    data: {
                        authToken: token
                    }
                });
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Erro inesperado: " + error.message
            });
        }
    }
}

module.exports = new UserController();