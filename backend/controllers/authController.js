const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.login = async (req,res)=>{

  try{

    const {email,senha} = req.body;

    const [users] = await db.query(
      "SELECT * FROM usuarios WHERE email=?",
      [email]
    );

    if(users.length === 0){
      return res.status(401).json({
        message:"Usuário ou senha inválidos"
      });
    }

    const user = users[0];

    const senhaValida = await bcrypt.compare(
      senha,
      user.senha
    );

    if(!senhaValida){
      return res.status(401).json({
        message:"Usuário ou senha inválidos"
      });
    }

    const token = jwt.sign(
      {id:user.id,tipo:user.tipo},
      process.env.JWT_SECRET,
      {expiresIn:"2h"}
    );

    res.json({
      token,
      tipo:user.tipo
    });

  }catch(error){

    res.status(500).json({
      message:"Erro interno"
    });

  }

};

exports.register = async (req, res) => {
  try {
    const { nome, email, senha, telefone, modalidade } = req.body;

    // Verifica se já existe
    const [existe] = await db.query(
      "SELECT id FROM usuarios WHERE email = ?",
      [email]
    );

    if (existe.length > 0) {
      return res.status(400).json({ message: "E-mail já cadastrado" });
    }

    const hash = await bcrypt.hash(senha, 10);

    await db.query(
      `INSERT INTO usuarios
       (nome, email, senha, telefone, tipo, status, modalidade)
       VALUES (?, ?, ?, ?, 'ALUNO', 'ATIVO', ?)`,
      [nome, email, hash, telefone, modalidade]
    );

    res.status(201).json({ message: "Cadastro realizado com sucesso" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao cadastrar" });
  }
};

exports.forgotPassword = async (req,res)=>{

  const {email} = req.body;

  const [users] = await db.query(
    "SELECT * FROM usuarios WHERE email=?",
    [email]
  );

  if(users.length === 0){
    return res.json({
      message:"Email não encontrado"
    });
  }

  res.json({
    message:"Link de recuperação enviado"
  });

};