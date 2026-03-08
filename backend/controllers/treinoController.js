const db = require("../config/db");

// LISTAR TODOS (ADMIN)
exports.getAll = (req, res) => {
    db.query("SELECT * FROM treinos", (err, results) => {
        if (err) return res.status(400).json(err);
        res.json(results);
    });
};

// CRIAR TREINO
exports.create = (req, res) => {
    const { usuario_id } = req.body;

    const hoje = new Date();
    const limite = new Date();
    limite.setDate(hoje.getDate() + 40);

    db.query(
        "INSERT INTO treinos (usuario_id, data_publicacao, data_limite_troca, status) VALUES (?, ?, ?, ?)",
        [usuario_id, hoje, limite, "ATIVO"],
        (err) => {
            if (err) return res.status(400).json(err);
            res.json({ message: "Treino criado" });
        }
    );
};

// ADICIONAR EXERCÍCIO AO TREINO
exports.adicionarExercicio = (req, res) => {
    const { treino_id, exercicio_id, series, repeticoes, peso } = req.body;

    db.query(
        `INSERT INTO treino_exercicios
         (treino_id, exercicio_id, series, repeticoes, peso)
         VALUES (?, ?, ?, ?, ?)`,
        [treino_id, exercicio_id, series, repeticoes, peso],
        (err) => {
            if (err) return res.status(400).json(err);
            res.json({ message: "Exercício adicionado ao treino" });
        }
    );
};

// TREINO COMPLETO (com exercícios + imagem)
exports.getTreinoCompleto = (req, res) => {
    const treinoId = req.params.id;

    db.query(
        "SELECT * FROM treinos WHERE id=?",
        [treinoId],
        (err, treinoResult) => {

            if (err) return res.status(400).json(err);
            if (!treinoResult.length)
                return res.status(404).json({ message: "Treino não encontrado" });

            db.query(
                `SELECT 
                    e.id,
                    e.nome,
                    e.descricao,
                    e.imagem_url,
                    te.series,
                    te.repeticoes,
                    te.peso
                FROM treino_exercicios te
                JOIN exercicios e ON e.id = te.exercicio_id
                WHERE te.treino_id = ?`,
                [treinoId],
                (err2, exerciciosResult) => {

                    if (err2) return res.status(400).json(err2);

                    res.json({
                        treino: treinoResult[0],
                        exercicios: exerciciosResult
                    });
                }
            );
        }
    );
};

// HISTÓRICO DO ALUNO
exports.meusTreinos = (req, res) => {
    const usuarioId = req.user.id;

    db.query(
        "SELECT * FROM treinos WHERE usuario_id=? ORDER BY data_publicacao DESC",
        [usuarioId],
        (err, results) => {
            if (err) return res.status(400).json(err);
            res.json(results);
        }
    );
};

// SOLICITAR TROCA
exports.solicitarTroca = (req, res) => {

    db.query(
        "SELECT data_limite_troca FROM treinos WHERE id=?",
        [req.params.id],
        (err, result) => {

            if (err) return res.status(400).json(err);
            if (!result.length)
                return res.status(404).json({ message: "Treino não encontrado" });

            const hoje = new Date();
            const limite = new Date(result[0].data_limite_troca);

            if (hoje < limite) {
                return res.status(400).json({
                    message: "Troca permitida somente após 40 dias"
                });
            }

            db.query(
                "UPDATE treinos SET status='SOLICITADO' WHERE id=?",
                [req.params.id],
                (err2) => {
                    if (err2) return res.status(400).json(err2);
                    res.json({ message: "Troca solicitada" });
                }
            );
        }
    );
};

// FEEDBACK DO PROFESSOR
exports.enviarFeedback = (req, res) => {
    const { treino_id, comentario } = req.body;

    db.query(
        "INSERT INTO feedbacks (treino_id, comentario) VALUES (?, ?)",
        [treino_id, comentario],
        (err) => {
            if (err) return res.status(400).json(err);
            res.json({ message: "Feedback enviado" });
        }
    );
};