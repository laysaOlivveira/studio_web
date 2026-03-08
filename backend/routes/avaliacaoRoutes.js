const express = require("express");
const router = express.Router();

const avaliacaoController = require("../controllers/avaliacaoController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// US20 – Registrar avaliação (ADMIN ou PROFESSOR)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "PROFESSOR"),
  avaliacaoController.create
);

// US21 – Histórico
router.get(
  "/:usuario_id",
  authMiddleware,
  avaliacaoController.getByUser
);

// US22 – Comparativo
router.get(
  "/:usuario_id/comparativo",
  authMiddleware,
  avaliacaoController.comparativo
);

// US19 – Agendar avaliação (ADMIN)
router.post(
  "/agendar",
  authMiddleware,
  roleMiddleware("ADMIN"),
  avaliacaoController.agendar
);

module.exports = router;