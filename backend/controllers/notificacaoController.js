const whatsappService = require("../services/whatsappService");

exports.confirmarMatricula = async (usuario) => {

    await whatsappService.enviarMensagem(
        usuario.telefone,
        `🎉 Olá ${usuario.nome}! Sua matrícula foi confirmada com sucesso! Seja bem-vindo(a)!`
    );

};

exports.notificarTreino = async (usuario) => {

    await whatsappService.enviarMensagem(
        usuario.telefone,
        `💪 ${usuario.nome}, seu novo treino já está disponível no sistema!`
    );

};