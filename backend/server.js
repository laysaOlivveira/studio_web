const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const exercicioRoutes = require("./routes/exercicioRoutes");
const treinoRoutes = require("./routes/treinoRoutes");
const turmaRoutes = require("./routes/turmaRoutes");
const avaliacaoRoutes = require("./routes/avaliacaoRoutes");
const app = express();

app.use(cors({
  origin: "https://studiofuncionaldev.vercel.app"
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/exercicios", exercicioRoutes);
app.use("/api/treinos", treinoRoutes);
app.use("/api/turmas", turmaRoutes);
app.use("/api/avaliacoes", avaliacaoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});