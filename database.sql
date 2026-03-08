CREATE DATABASE studio_funcional;
USE studio_funcional;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    tipo ENUM('ADMIN', 'ALUNO') NOT NULL,
    status ENUM('ATIVO', 'INADIMPLENTE', 'CANCELADO') DEFAULT 'ATIVO'
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exercicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    imagem_url TEXT,
    grupo_muscular VARCHAR(50)
);

CREATE TABLE treinos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    data_publicacao DATE,
    data_limite_troca DATE,
    status VARCHAR(50),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE treinos_exercicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    treino_id INT,
    exercicio_id INT,
    series INT,
    repeticoes INT,
    carga VARCHAR(50),
    FOREIGN KEY (treino_id) REFERENCES treinos(id),
    FOREIGN KEY (exercicio_id) REFERENCES exercicios(id)
);

DROP TABLE IF EXISTS avaliacoes;

CREATE TABLE avaliacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    peso DECIMAL(5,2),
    altura DECIMAL(4,2),
    imc DECIMAL(5,2),
    percentual_gordura DECIMAL(5,2),

    braco DECIMAL(5,2),
    antebraco DECIMAL(5,2),
    peito DECIMAL(5,2),
    cintura DECIMAL(5,2),
    abdomen DECIMAL(5,2),
    quadril DECIMAL(5,2),
    coxa DECIMAL(5,2),
    panturrilha DECIMAL(5,2),
    gordura DECIMAL(5,2),

    data_avaliacao DATE DEFAULT (CURRENT_DATE),

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE pagamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    valor DECIMAL(10,2),
    forma_pagamento ENUM('PIX', 'CARTAO'),
    status ENUM('PENDENTE', 'PAGO') DEFAULT 'PENDENTE',
    data_pagamento DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);


CREATE TABLE feedbacks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    mensagem TEXT NOT NULL,
    data_feedback DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE gastos_fixos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(100),
    valor DECIMAL(10,2),
    data_referencia DATE DEFAULT (CURRENT_DATE)
);

CREATE TABLE turmas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    modalidade ENUM('FUNCIONAL') DEFAULT 'FUNCIONAL',
    horario TIME NOT NULL,
    vagas_maximas INT NOT NULL,
    status ENUM('ABERTA', 'LOTADA') DEFAULT 'ABERTA'
);

CREATE TABLE matriculas_turma (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    turma_id INT NOT NULL,
    data_matricula DATE DEFAULT (CURRENT_DATE),

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (turma_id) REFERENCES turmas(id)
);

SELECT SUM(valor) FROM pagamentos 
WHERE status = 'pago' 
AND MONTH(data_pagamento) = MONTH(CURDATE());

SELECT COUNT(*) FROM usuarios WHERE tipo = 'ALUNO';

CREATE TABLE logs_acesso (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  rota VARCHAR(255),
  data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);