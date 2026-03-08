const express = require("express");
const router = express.Router();

const controller = require("../controllers/treinoController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// 🔐 ADMIN - listar todos
router.get("/", authMiddleware, roleMiddleware("ADMIN"), controller.getAll);

// 🔐 ADMIN - criar treino
router.post("/", authMiddleware, roleMiddleware("ADMIN"), controller.create);

// 🔐 ADMIN - adicionar exercício ao treino
router.post("/adicionar-exercicio", authMiddleware, roleMiddleware("ADMIN"), controller.adicionarExercicio);

// 🔐 ALUNO - ver próprios treinos
router.get("/meus", authMiddleware, roleMiddleware("ALUNO"), controller.meusTreinos);

// 🔐 ALUNO - solicitar troca
router.post("/:id/solicitar-troca", authMiddleware, roleMiddleware("ALUNO"), controller.solicitarTroca);

// 🔐 ADMIN - enviar feedback
router.post("/feedback", authMiddleware, roleMiddleware("ADMIN"), controller.enviarFeedback);

module.exports = router;