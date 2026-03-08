const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware"); // ✅ import direto
const roleMiddleware = require("../middlewares/roleMiddleware");

// HISTÓRICO (ADMIN)
router.get(
  "/:id/historico",
  authMiddleware,
  roleMiddleware("ADMIN"),
  userController.historico
);

// GET POR ID
// ADMIN pode ver qualquer um
// ALUNO só pode ver ele mesmo
router.get("/:id", authMiddleware, userController.getById);

// LISTAR TODOS (ADMIN)
router.get("/", authMiddleware, roleMiddleware("ADMIN"), userController.listar);

// CRIAR USUÁRIO (ADMIN)
router.post("/", authMiddleware, roleMiddleware("ADMIN"), userController.create);

// ATUALIZAR
// ADMIN qualquer um
// ALUNO só ele mesmo
router.put("/:id", authMiddleware, userController.update);

// CANCELAR (ADMIN)
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), userController.remove);

module.exports = router;