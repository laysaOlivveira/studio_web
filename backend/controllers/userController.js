const db = require("../config/db");

// LISTAR (ADMIN)
exports.listar = async (req, res) => {
    const [users] = await db.query(
        "SELECT id, nome, email, tipo, status FROM usuarios"
    );
    res.json(users);
};

// GET POR ID
exports.getById = async (req, res) => {
    const { id } = req.params;

    //  Se for ALUNO, só pode ver ele mesmo
    if (req.user.tipo === "ALUNO" && req.user.id != id) {
        return res.status(403).json({ message: "Acesso negado" });
    }

    const [user] = await db.query(
        "SELECT id, nome, email, tipo, status FROM usuarios WHERE id = ?",
        [id]
    );

    if (!user.length) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json(user[0]);
};

// CRIAR (ADMIN)
exports.create = async (req, res) => {
    const { nome, email, senha, tipo } = req.body;

    const bcrypt = require("bcryptjs");
    const senhaHash = await bcrypt.hash(senha, 10);

    await db.query(
        "INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)",
        [nome, email, senhaHash, tipo]
    );

    res.status(201).json({ message: "Usuário criado com sucesso" });
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone, modalidade, senha } = req.body;

    // ALUNO só pode atualizar ele mesmo
    if (req.user.tipo === "ALUNO" && req.user.id != id) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    // Busca usuário atual
    const [usuario] = await db.query(
      "SELECT * FROM usuarios WHERE id = ?",
      [id]
    );

    if (!usuario.length) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    let senhaAtualizada = usuario[0].senha;

    // Se enviar nova senha, criptografa
    if (senha) {
      senhaAtualizada = await bcrypt.hash(senha, 10);
    }

    await db.query(
      `UPDATE usuarios
       SET nome = ?, telefone = ?, modalidade = ?, senha = ?
       WHERE id = ?`,
      [
        nome || usuario[0].nome,
        telefone || usuario[0].telefone,
        modalidade || usuario[0].modalidade,
        senhaAtualizada,
        id
      ]
    );

    res.json({ message: "Atualizado com sucesso" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
};

// CANCELAR (ADMIN)
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    // só ADMIN pode cancelar
    if (req.user.tipo !== "ADMIN") {
      return res.status(403).json({ message: "Acesso negado" });
    }

    await db.query(
      "UPDATE usuarios SET status = 'CANCELADO' WHERE id = ?",
      [id]
    );

    res.json({ message: "Aluno cancelado com sucesso" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao cancelar aluno" });
  }
};

exports.atualizarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (req.user.tipo !== "ADMIN") {
      return res.status(403).json({ message: "Acesso negado" });
    }

    await db.query(
      "UPDATE usuarios SET status = ? WHERE id = ?",
      [status, id]
    );

    res.json({ message: "Status atualizado com sucesso" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar status" });
  }
};

exports.historico = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.tipo !== "ADMIN") {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const [usuario] = await db.query(
      "SELECT id, nome, email, status FROM usuarios WHERE id = ?",
      [id]
    );

    if (!usuario.length) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const [avaliacoes] = await db.query(
      "SELECT * FROM avaliacoes WHERE usuario_id = ?",
      [id]
    );

    const [pagamentos] = await db.query(
      "SELECT * FROM pagamentos WHERE usuario_id = ?",
      [id]
    );

    const [treinos] = await db.query(
      "SELECT * FROM treinos WHERE usuario_id = ?",
      [id]
    );

    res.json({
      usuario: usuario[0],
      avaliacoes,
      pagamentos,
      treinos
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar histórico" });
  }
};

exports.dashboardAluno = (req, res) => {

    const usuarioId = req.user.id;

    db.query(
        "SELECT id, nome, email, status FROM usuarios WHERE id=?",
        [usuarioId],
        (err, userResult) => {

            if (err) return res.status(400).json(err);

            db.query(
                "SELECT * FROM treinos WHERE usuario_id=? AND status='ATIVO'",
                [usuarioId],
                (err2, treinoResult) => {

                    if (err2) return res.status(400).json(err2);

                    db.query(
                        "SELECT * FROM avaliacoes WHERE usuario_id=? ORDER BY data_avaliacao DESC LIMIT 3",
                        [usuarioId],
                        (err3, avaliacaoResult) => {

                            if (err3) return res.status(400).json(err3);

                            res.json({
                                usuario: userResult[0],
                                treinoAtivo: treinoResult[0] || null,
                                ultimasAvaliacoes: avaliacaoResult
                            });
                        }
                    );
                }
            );
        }
    );
};