const express = require("express");
const router = express.Router();

const controller = require("../controllers/exercicioController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// 🔓 Visualizar exercícios (qualquer logado)
router.get("/", authMiddleware, controller.getAll);

// 🔐 ADMIN cria
router.post("/", authMiddleware, roleMiddleware("ADMIN"), controller.create);

// 🔐 ADMIN atualiza
router.put("/:id", authMiddleware, roleMiddleware("ADMIN"), controller.update);

// ADMIN remove
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), controller.remove);

module.exports = router;