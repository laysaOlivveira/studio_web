const db = require("../config/db");
const bbService = require("../services/bbService");

// PIX
exports.pagarPix = async (req, res) => {
    try {
        const usuario_id = req.user.id;
        const { valor } = req.body;

        const pix = await bbService.criarPix(usuario_id, valor);

        await db.query(
            `INSERT INTO pagamentos (usuario_id, valor, forma_pagamento, status)
             VALUES (?, ?, 'PIX', 'PENDENTE')`,
            [usuario_id, valor]
        );

        res.json(pix);

    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar PIX" });
    }
};

exports.pagarCartao = async (req, res) => {
    try {
        const usuario_id = req.user.id;
        const { valor, numero, validade, cvv } = req.body;

        const resultado = await bbService.processarCartao(
            { numero, validade, cvv },
            valor
        );

        const status = resultado.status === "APROVADO" ? "PAGO" : "PENDENTE";

        await db.query(
            `INSERT INTO pagamentos (usuario_id, valor, forma_pagamento, status, data_pagamento)
             VALUES (?, ?, 'CARTAO', ?, CURDATE())`,
            [usuario_id, valor, status]
        );

        res.json(resultado);

    } catch (error) {
        res.status(500).json({ message: "Erro no pagamento cartão" });
    }
};

exports.confirmarPix = async (req, res) => {
    try {
        const { usuario_id } = req.body;

        await db.query(
            `UPDATE pagamentos 
             SET status = 'PAGO', data_pagamento = CURDATE()
             WHERE usuario_id = ? AND status = 'PENDENTE'`,
            [usuario_id]
        );

        await db.query(
            `UPDATE usuarios
             SET status = 'ATIVO'
             WHERE id = ?`,
            [usuario_id]
        );

        res.json({ message: "Pagamento confirmado automaticamente" });

    } catch (error) {
        res.status(500).json({ message: "Erro na confirmação" });
    }
};

exports.fluxoCaixaMensal = async (req, res) => {
    try {
        const [resultado] = await db.query(
            `SELECT 
                SUM(CASE WHEN status='PAGO' THEN valor ELSE 0 END) AS total_recebido,
                SUM(CASE WHEN status='PENDENTE' THEN valor ELSE 0 END) AS total_pendente,
                MONTH(data_pagamento) AS mes
             FROM pagamentos
             WHERE MONTH(data_pagamento) = MONTH(CURDATE())
             GROUP BY mes`
        );

        res.json(resultado);

    } catch (error) {
        res.status(500).json({ message: "Erro ao calcular fluxo de caixa" });
    }
};

exports.relatorioPorAluno = async (req, res) => {
    try {
        const [resultado] = await db.query(
            `SELECT u.nome, SUM(p.valor) AS total_pago
             FROM pagamentos p
             JOIN usuarios u ON p.usuario_id = u.id
             WHERE p.status = 'PAGO'
             GROUP BY u.id`
        );

        res.json(resultado);

    } catch (error) {
        res.status(500).json({ message: "Erro no relatório" });
    }
};