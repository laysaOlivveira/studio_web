const db = require("../config/db");

exports.create = (req, res) => {
    const { usuario_id, mensagem } = req.body;

    db.query(
        "INSERT INTO feedbacks (usuario_id, mensagem) VALUES (?, ?)",
        [usuario_id, mensagem],
        (err) => {
            if (err) return res.status(400).json(err);
            res.json({ message: "Feedback registrado" });
        }
    );
};

exports.getByUser = (req, res) => {
    db.query(
        "SELECT * FROM feedbacks WHERE usuario_id = ? ORDER BY data_feedback DESC",
        [req.params.usuario_id],
        (err, results) => {
            if (err) return res.status(400).json(err);
            res.json(results);
        }
    );
};
