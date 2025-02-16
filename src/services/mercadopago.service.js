import { MercadoPagoConfig, Payment as MercadoPagoPayment } from 'mercadopago';

const MERCADOPAGO_ACCESS_TOKEN = 'TEST-3880641801499571-021519-92f7c561f1a4fa184ab33463c0ce17bd-529700452';

const MercadoPagoService = {
    createQrCode: async (price, description) => {

        const client = new MercadoPagoConfig({
            accessToken: MERCADOPAGO_ACCESS_TOKEN, options: { timeout: 5000, idempotencyKey: 'IDEMPOTENCY_KEY' }
        });

        const payment = new MercadoPagoPayment(client);

        const body = {
            transaction_amount: price,
            description: description,
            payment_method_id: "pix",
            payer: {
                email: "payment@fiap.com"
            },
        };

        try {

            const paymentResponse = await payment.create({ body });
            const response = {
                "qr_code": paymentResponse.point_of_interaction.transaction_data.qr_code,
                "url": paymentResponse.point_of_interaction.transaction_data.ticket_url
            };
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default MercadoPagoService;