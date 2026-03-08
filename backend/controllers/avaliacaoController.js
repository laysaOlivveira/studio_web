const db = require("../config/db");
//US20 – REGISTRAR AVALIAÇÃO COMPLETA
// (ADMIN ou PROFESSOR)
exports.create = async (req, res) => {
    try {
        const {
            usuario_id,
            peso,
            altura,
            percentual_gordura,
            braco,
            antebraco,
            peito,
            cintura,
            abdomen,
            quadril,
            coxa,
            panturrilha
        } = req.body;

        // 🔎 Validações básicas
        if (!usuario_id || !peso || !altura) {
            return res.status(400).json({
                message: "Usuário, peso e altura são obrigatórios"
            });
        }

        if (peso <= 0 || altura <= 0) {
            return res.status(400).json({
                message: "Peso e altura devem ser maiores que zero"
            });
        }

        // 📐 cálculo automático do IMC
        const imc = (peso / (altura * altura)).toFixed(2);

        await db.query(
            `INSERT INTO avaliacoes
            (usuario_id, peso, altura, imc, percentual_gordura,
             braco, antebraco, peito, cintura, abdomen,
             quadril, coxa, panturrilha)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                usuario_id,
                peso,
                altura,
                imc,
                percentual_gordura || null,
                braco || null,
                antebraco || null,
                peito || null,
                cintura || null,
                abdomen || null,
                quadril || null,
                coxa || null,
                panturrilha || null
            ]
        );

        res.status(201).json({
            message: "Avaliação registrada com sucesso",
            imc
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao registrar avaliação" });
    }
};



// ========================================
// ✅ US21 – HISTÓRICO DE AVALIAÇÕES
// ========================================
exports.getByUser = async (req, res) => {
    try {

        const { usuario_id } = req.params;

        // 🚫 ALUNO só pode ver a própria avaliação
        if (req.user.tipo === "ALUNO" && req.user.id != usuario_id) {
            return res.status(403).json({ message: "Acesso negado" });
        }

        const [results] = await db.query(
            `SELECT *
             FROM avaliacoes
             WHERE usuario_id = ?
             ORDER BY data_avaliacao DESC`,
            [usuario_id]
        );

        res.json(results);

    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar avaliações" });
    }
};



// ========================================
// ✅ US22 – COMPARATIVO DE EVOLUÇÃO
// (última vs penúltima avaliação)
// ========================================
exports.comparativo = async (req, res) => {
    try {

        const { usuario_id } = req.params;

        // 🚫 ALUNO só pode comparar a própria evolução
        if (req.user.tipo === "ALUNO" && req.user.id != usuario_id) {
            return res.status(403).json({ message: "Acesso negado" });
        }

        const [avaliacoes] = await db.query(
            `SELECT *
             FROM avaliacoes
             WHERE usuario_id = ?
             ORDER BY data_avaliacao DESC
             LIMIT 2`,
            [usuario_id]
        );

        if (avaliacoes.length < 2) {
            return res.status(400).json({
                message: "Necessário pelo menos 2 avaliações para comparar"
            });
        }

        const atual = avaliacoes[0];
        const anterior = avaliacoes[1];

        const diferenca = {
            peso: (atual.peso - anterior.peso).toFixed(2),
            imc: (atual.imc - anterior.imc).toFixed(2),
            percentual_gordura: atual.percentual_gordura && anterior.percentual_gordura
                ? (atual.percentual_gordura - anterior.percentual_gordura).toFixed(2)
                : null,
            braco: atual.braco && anterior.braco
                ? (atual.braco - anterior.braco).toFixed(2)
                : null,
            cintura: atual.cintura && anterior.cintura
                ? (atual.cintura - anterior.cintura).toFixed(2)
                : null,
            coxa: atual.coxa && anterior.coxa
                ? (atual.coxa - anterior.coxa).toFixed(2)
                : null
        };

        res.json({
            atual,
            anterior,
            diferenca
        });

    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar comparativo" });
    }
};



//  US19 – AGENDAR AVALIAÇÃO (ADMIN)
exports.agendar = async (req, res) => {
    try {

        const { usuario_id, data_avaliacao } = req.body;

        if (!usuario_id || !data_avaliacao) {
            return res.status(400).json({
                message: "Usuário e data são obrigatórios"
            });
        }

        await db.query(
            `INSERT INTO avaliacoes_agendadas (usuario_id, data_avaliacao)
             VALUES (?, ?)`,
            [usuario_id, data_avaliacao]
        );

        res.status(201).json({
            message: "Avaliação agendada com sucesso"
        });

    } catch (error) {
        res.status(500).json({ message: "Erro ao agendar avaliação" });
    }
};