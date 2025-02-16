import PaymentService from '../../src/services/payment.service.js';
import Payment from '../../src/models/payment.model.js';
import MercadoPagoService from '../../src/services/mercadopago.service.js'
import { jest } from '@jest/globals';

jest.mock('../../src/models/payment.model.js');
jest.mock('../../src/services/mercadopago.service.js')

describe('PaymentService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createPayment', () => {
        it('should create a payment and return QR code and payment info', async () => {
            const price = 100;
            const description = 'Test Payment';
            const qrcode = { qr_code: 'test_qr_code', url: 'test_url' };
            const payment = { id: 1, price, description, status: 'PENDING' };

            MercadoPagoService.createQrCode.mockResolvedValue(qrcode);
            Payment.create.mockResolvedValue(payment);

            const result = await PaymentService.createPayment(price, description);

            expect(MercadoPagoService.createQrCode).toHaveBeenCalledWith(price, description);
            expect(Payment.create).toHaveBeenCalledWith({ price, description, status: 'PENDING' });
            expect(result).toEqual({ info: qrcode, payment });
        });

        it('should throw an error if QR code creation fails', async () => {
            const price = 100;
            const description = 'Test Payment';

            MercadoPagoService.createQrCode.mockResolvedValue(null);

            await expect(PaymentService.createPayment(price, description)).rejects.toThrow('Erro ao criar QR Code');
        });
    });

    describe('getPayments', () => {
        it('should return all payments', async () => {
            const payments = [{ id: 1, price: 100, description: 'Test Payment', status: 'PENDING' }];
            Payment.findAll.mockResolvedValue(payments);

            const result = await PaymentService.getPayments();

            expect(Payment.findAll).toHaveBeenCalled();
            expect(result).toEqual(payments);
        });

        it('should throw error', async () => {
            const payments = [{ id: 1, price: 100, description: 'Test Payment', status: 'PENDING' }];
            Payment.findAll.mockRejectedValue(new Error("Error"));

            await expect(PaymentService.getPayments()).rejects.toThrow("Error");
        });
    });

    describe('getPayment', () => {
        it('should return a payment by id', async () => {
            const payment = { id: 1, price: 100, description: 'Test Payment', status: 'PENDING' };
            Payment.findByPk.mockResolvedValue(payment);

            const result = await PaymentService.getPayment(1);

            expect(Payment.findByPk).toHaveBeenCalledWith(1);
            expect(result).toEqual(payment);
        });
    });

    describe('updatePayment', () => {
        it('should update a payment status and return the updated payment', async () => {
            const payment = { id: 1, price: 100, description: 'Test Payment', status: 'COMPLETED' };
            Payment.update.mockResolvedValue([1]);
            Payment.findByPk.mockResolvedValue(payment);

            const result = await PaymentService.updatePayment(1, 'COMPLETED');

            expect(Payment.update).toHaveBeenCalledWith({ status: 'COMPLETED' }, { where: { id: 1 } });
            expect(Payment.findByPk).toHaveBeenCalledWith(1);
            expect(result).toEqual(payment);
        });
    });
});