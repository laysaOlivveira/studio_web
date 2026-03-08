const express = require("express");
const router = express.Router();

const pagamentoController = require("../controllers/pagamentoController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// PIX
router.post("/pix", authMiddleware, roleMiddleware("ALUNO"), pagamentoController.pagarPix);

// Cartão
router.post("/cartao", authMiddleware, roleMiddleware("ALUNO"), pagamentoController.pagarCartao);

// Webhook simulado
router.post("/confirmar", pagamentoController.confirmarPix);

// Fluxo de caixa
router.get("/fluxo", authMiddleware, roleMiddleware("ADMIN"), pagamentoController.fluxoCaixaMensal);

// Relatório
router.get("/relatorio", authMiddleware, roleMiddleware("ADMIN"), pagamentoController.relatorioPorAluno);

module.exports = router;