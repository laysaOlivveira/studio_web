const axios = require("axios");

const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = process.env.WHATSAPP_PHONE_ID;

const BASE_URL = `https://graph.facebook.com/v18.0/${PHONE_ID}/messages`;

async function enviarMensagem(numero, mensagem) {

    const response = await axios.post(
        BASE_URL,
        {
            messaging_product: "whatsapp",
            to: numero,
            type: "text",
            text: {
                body: mensagem
            }
        },
        {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                "Content-Type": "application/json"
            }
        }
    );

    return response.data;
}

module.exports = { enviarMensagem };