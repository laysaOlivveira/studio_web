const db = require("../config/db");

exports.registrarGastoFixo = (req, res) => {
    const { descricao, valor } = req.body;

    db.query(
        "INSERT INTO gastos_fixos (descricao, valor) VALUES (?, ?)",
        [descricao, valor],
        (err) => {
            if (err) return res.status(400).json(err);
            res.json({ message: "Gasto fixo registrado" });
        }
    );
};

const PDFDocument = require("pdfkit");
const fs = require("fs");

exports.gerarRelatorioPDF = (req, res) => {

    db.query("SELECT SUM(valor) as receita FROM pagamentos WHERE status='PAGO'", 
    (err, result) => {

        const receita = result[0].receita || 0;

        const doc = new PDFDocument();
        const filePath = "relatorio_financeiro.pdf";

        doc.pipe(fs.createWriteStream(filePath));

        doc.fontSize(18).text("Relatório Financeiro");
        doc.moveDown();
        doc.text("Receita Total: R$ " + receita);

        doc.end();

        res.download(filePath);
    });
};

exports.relatorioFinanceiro = (req, res) => {

    db.query("SELECT SUM(valor) as receita_bruta FROM pagamentos WHERE status='PAGO'", 
    (err, receitaResult) => {

        if (err) return res.status(400).json(err);

        db.query("SELECT SUM(valor) as total_gastos FROM gastos_fixos",
        (err2, gastosResult) => {

            if (err2) return res.status(400).json(err2);

            const receitaBruta = receitaResult[0].receita_bruta || 0;
            const totalGastos = gastosResult[0].total_gastos || 0;
            const receitaLiquida = receitaBruta - totalGastos;

            res.json({
                receita_bruta: receitaBruta,
                total_gastos: totalGastos,
                receita_liquida: receitaLiquida
            });
        });
    });
};
