import PaymentService from '../services/payment.service.js';

const PaymentController = {
    createPayment: async (req, res) => {
        try {
            const { price, description } = req.body;
            if (!price) {
                return res.status(400).json({ message: 'Price are required' });
            }
            const payment = await PaymentService.createPayment(price, description);
            console.log(payment)
            return res.status(201).json(payment);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getPayments: async (req, res) => {
        try {
            const payments = await PaymentService.getPayments();
            return res.status(200).json(payments);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getPaymentById: async (req, res) => {
        try {
            const { id } = req.params;
            const payment = await PaymentService.getPayment(id);
            if (!payment) {
                return res.status(404).json({ message: 'Payment not found' });
            }
            return res.status(200).json(payment);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    updatePayment: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            if (!status) {
                return res.status(400).json({ message: 'Status are required' });
            }
            const payment = await PaymentService.updatePayment(id, status);
            if (!payment) {
                return res.status(404).json({ message: 'Payment not found' });
            }
            return res.status(200).json(payment);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default PaymentController;