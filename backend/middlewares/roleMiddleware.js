function roleMiddleware(...tiposPermitidos) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Não autenticado" });
    if (!tiposPermitidos.includes(req.user.tipo)) return res.status(403).json({ message: "Acesso negado" });
    next();
  };
}

module.exports = roleMiddleware;