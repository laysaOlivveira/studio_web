const express = require("express");
const router = express.Router();
const turmaController = require("../controllers/turmaController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// US15 – Criar Turma (ADMIN)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  turmaController.criarTurma
);

// US16 – Listar Turmas (Logado)
router.get(
  "/",
  authMiddleware,
  turmaController.listarTurmas
);

// US17 – Inscrição (ALUNO)
router.post(
  "/:turmaId/inscrever",
  authMiddleware,
  roleMiddleware("ALUNO"),
  turmaController.inscreverAluno
);

// US18 – Criar Aviso (ADMIN)
router.post(
  "/:turmaId/avisos",
  authMiddleware,
  roleMiddleware("ADMIN"),
  turmaController.criarAviso
);

// US18 – Listar Avisos
router.get(
  "/:turmaId/avisos",
  authMiddleware,
  turmaController.listarAvisos
);

module.exports = router;