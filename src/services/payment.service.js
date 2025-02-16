import Payment from '../models/payment.model.js';
import MercadoPagoService from './mercadopago.service.js'

const PaymentService = {

    createPayment: async (price, description) => {
        try {
            const qrcode = await MercadoPagoService.createQrCode(price, description);
            if (!qrcode) {
                throw new Error('Erro ao criar QR Code');
            }

            const payment = await Payment.create({
                price: price,
                description: description,
                status: 'PENDING'
            });

            return { "info": qrcode, "payment": payment };
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    getPayments: async () => {
        try {
            const payments = await Payment.findAll();
            return payments;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    getPayment: async (id) => {
        try {
            const payment = await Payment.findByPk(id);
            return payment;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    updatePayment: async (id, status) => {
        try {
            await Payment.update({ status: status }, { where: { id: id } });
            const updatedPayment = await Payment.findByPk(id);
            return updatedPayment;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}



export default PaymentService;