const db = require("../config/db");

// US33 – Dashboard Geral
exports.dashboardGeral = async (req, res) => {
    try {

        // Total de alunos ativos
        const [totalAlunos] = await db.query(`
            SELECT COUNT(*) as total
            FROM usuarios
            WHERE role = 'ALUNO' AND status = 'ATIVO'
        `);

        // Total de inadimplentes
        const [inadimplentes] = await db.query(`
            SELECT COUNT(*) as total
            FROM usuarios
            WHERE role = 'ALUNO' AND status = 'INADIMPLENTE'
        `);

        // Receita mensal (pagos)
        const [receitaMensal] = await db.query(`
            SELECT 
                SUM(valor) as total
            FROM pagamentos
            WHERE status = 'PAGO'
              AND MONTH(data_pagamento) = MONTH(CURDATE())
              AND YEAR(data_pagamento) = YEAR(CURDATE())
        `);

        // Receita pendente
        const [pendente] = await db.query(`
            SELECT 
                SUM(valor) as total
            FROM pagamentos
            WHERE status = 'PENDENTE'
        `);

        res.json({
            totalAlunos: totalAlunos[0].total || 0,
            inadimplentes: inadimplentes[0].total || 0,
            receitaMensal: receitaMensal[0].total || 0,
            receitaPendente: pendente[0].total || 0
        });

    } catch (error) {
        res.status(500).json({ message: "Erro ao carregar dashboard" });
    }
};

// US34 – Próximas Avaliações
exports.proximasAvaliacoes = async (req, res) => {
    try {

        const [avaliacoes] = await db.query(`
            SELECT 
                a.id,
                u.nome,
                a.data_avaliacao
            FROM avaliacoes a
            JOIN usuarios u ON a.usuario_id = u.id
            WHERE a.data_avaliacao >= CURDATE()
            ORDER BY a.data_avaliacao ASC
            LIMIT 10
        `);

        res.json(avaliacoes);

    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar avaliações" });
    }
};