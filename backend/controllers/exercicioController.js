const db = require("../config/db");

// LISTAR EXERCÍCIOS
exports.getAll = async (req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM exercicios");
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar exercícios" });
    }
};

// CRIAR EXERCÍCIO (COM UPLOAD)
exports.create = async (req, res) => {
    try {
        const { nome, descricao, grupo_muscular } = req.body;

        const imagem_url = req.file
            ? `/uploads/${req.file.filename}`
            : null;

        await db.query(
            `INSERT INTO exercicios
            (nome, descricao, imagem_url, grupo_muscular)
            VALUES (?, ?, ?, ?)`,
            [nome, descricao, imagem_url, grupo_muscular]
        );

        res.status(201).json({ message: "Exercício criado com sucesso" });

    } catch (error) {
        res.status(500).json({ message: "Erro ao criar exercício" });
    }
};

// ATUALIZAR
exports.update = async (req, res) => {
    try {
        const { nome, descricao, grupo_muscular } = req.body;

        await db.query(
            `UPDATE exercicios
             SET nome=?, descricao=?, grupo_muscular=?
             WHERE id=?`,
            [nome, descricao, grupo_muscular, req.params.id]
        );

        res.json({ message: "Exercício atualizado" });

    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar exercício" });
    }
};

// REMOVER
exports.remove = async (req, res) => {
    try {
        await db.query(
            "DELETE FROM exercicios WHERE id=?",
            [req.params.id]
        );

        res.json({ message: "Exercício removido" });

    } catch (error) {
        res.status(500).json({ message: "Erro ao remover exercício" });
    }
};