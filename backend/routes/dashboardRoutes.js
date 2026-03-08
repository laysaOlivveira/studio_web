const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// Dashboard Geral
router.get(
  "/geral",
  authMiddleware,
  roleMiddleware("ADMIN"),
  dashboardController.dashboardGeral
);

// Próximas avaliações
router.get(
  "/avaliacoes",
  authMiddleware,
  roleMiddleware("ADMIN"),
  dashboardController.proximasAvaliacoes
);

module.exports = router;