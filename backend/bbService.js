// Simulação da API Banco do Brasil

exports.criarPix = async (usuario_id, valor) => {
    return {
        txid: "PIX" + Date.now(),
        qrCode: "000201010212...",
        copiaECola: "000201010212...",
        status: "AGUARDANDO_PAGAMENTO"
    };
};

exports.processarCartao = async (dadosCartao, valor) => {
    return {
        status: "APROVADO", // ou "RECUSADO"
        autorizacao: "AUTH" + Date.now()
    };
};