const db = require("../config/db");


// =========================
// US15 – Criar Turma
// =========================
exports.criarTurma = async (req, res) => {
    try {
        const { nome, horario, professor, data_inicio, data_fim, limite_vagas } = req.body;

        if (!nome || !horario || !professor || !data_inicio || !data_fim || !limite_vagas) {
            return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
        }

        if (limite_vagas <= 0) {
            return res.status(400).json({ message: "Limite deve ser maior que zero" });
        }

        if (new Date(data_fim) < new Date(data_inicio)) {
            return res.status(400).json({ message: "Data fim não pode ser anterior à data início" });
        }

        await db.query(
            `INSERT INTO turmas (nome, horario, professor, data_inicio, data_fim, limite_vagas)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nome, horario, professor, data_inicio, data_fim, limite_vagas]
        );

        res.status(201).json({ message: "Turma criada com sucesso" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// =========================
// US16 – Listar Turmas + Vagas
// =========================
exports.listarTurmas = async (req, res) => {
    try {
        const [turmas] = await db.query(`
            SELECT t.*, 
            (t.limite_vagas - COUNT(i.id)) AS vagas_disponiveis
            FROM turmas t
            LEFT JOIN inscricoes i ON t.id = i.turma_id
            GROUP BY t.id
        `);

        res.json(turmas);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// =========================
// US17 – Inscrição em Turma
// =========================
exports.inscreverAluno = async (req, res) => {
    try {
        const { turmaId } = req.params;

        // pega id do usuário autenticado
        const aluno_id = req.user.id;

        const [[turma]] = await db.query(`
            SELECT t.*, COUNT(i.id) AS total_inscritos
            FROM turmas t
            LEFT JOIN inscricoes i ON t.id = i.turma_id
            WHERE t.id = ?
            GROUP BY t.id
        `, [turmaId]);

        if (!turma) {
            return res.status(404).json({ message: "Turma não encontrada" });
        }

        if (turma.total_inscritos >= turma.limite_vagas) {
            return res.status(400).json({ message: "Turma lotada" });
        }

        await db.query(
            `INSERT INTO inscricoes (aluno_id, turma_id) VALUES (?, ?)`,
            [aluno_id, turmaId]
        );

        res.status(201).json({ message: "Inscrição realizada com sucesso" });

    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ message: "Aluno já inscrito nesta turma" });
        }
        res.status(500).json({ error: error.message });
    }
};

// US18 – Criar Aviso
exports.criarAviso = async (req, res) => {
    try {
        const { turmaId } = req.params;
        const { titulo, descricao } = req.body;

        if (!titulo || !descricao) {
            return res.status(400).json({ message: "Título e descrição são obrigatórios" });
        }

        await db.query(
            `INSERT INTO avisos (turma_id, titulo, descricao)
             VALUES (?, ?, ?)`,
            [turmaId, titulo, descricao]
        );

        res.status(201).json({ message: "Aviso criado com sucesso" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// =========================
// Listar Avisos da Turma
// =========================
exports.listarAvisos = async (req, res) => {
    try {
        const { turmaId } = req.params;
        const userId = req.user.id;
        const userRole = req.user.role;

        // ADMIN pode ver tudo
        if (userRole !== "ADMIN") {

            const [[inscrito]] = await db.query(
                `SELECT * FROM inscricoes 
                 WHERE turma_id = ? AND aluno_id = ?`,
                [turmaId, userId]
            );

            if (!inscrito) {
                return res.status(403).json({ message: "Acesso negado. Você não está inscrito nesta turma." });
            }
        }

        const [avisos] = await db.query(
            `SELECT * FROM avisos WHERE turma_id = ? ORDER BY data_publicacao DESC`,
            [turmaId]
        );

        res.json(avisos);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};