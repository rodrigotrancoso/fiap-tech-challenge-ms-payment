import PaymentController from '../../src/controllers/payment.controller';
import PaymentService from '../../src/services/payment.service';
import { jest } from '@jest/globals';

jest.mock('../../src/services/payment.service');

describe('PaymentController', () => {
    let req;
    let res;
    beforeEach(() => {
        jest.clearAllMocks();
        req = {
            params: {},
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });
    describe('POST /payments', () => {
        it('should create a new payment', async () => {
            req.body = { price: 100, description: 'Test payment' };
            const createdPayment = { id: 1, ...req.body };
            PaymentService.createPayment.mockResolvedValue(createdPayment);

            await PaymentController.createPayment(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(createdPayment);
        });

        it('should return 400 if price is missing', async () => {
            req.body = { description: 'Test payment' };

            await PaymentController.createPayment(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
        });
    });

    describe('GET /payments', () => {
        it('should get all payments', async () => {
            const payments = [{ id: 1, price: 100, description: 'Test payment' }];
            PaymentService.getPayments.mockResolvedValue(payments);

            await PaymentController.getPayments(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(payments);
        });
    });

    describe('GET /payments/:id', () => {
        it('should get payment by id', async () => {
            req.params = { id: 1 };
            const payment = { id: 1, price: 100, description: 'Test payment' };
            PaymentService.getPayment.mockResolvedValue(payment);

            await PaymentController.getPaymentById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(payment);
        });

        it('should return 404 if payment not found', async () => {
            req.params = { id: 1 };
            PaymentService.getPayment.mockResolvedValue(null);

            const response = await PaymentController.getPaymentById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });
    });

    describe('PATCH /payments/:id', () => {
        it('should update payment status', async () => {
            const updatedPayment = { id: 1, price: 100, description: 'Test payment', status: 'paid' };
            PaymentService.updatePayment.mockResolvedValue(updatedPayment);

            req.body = { status: 'paid' };
            req.params = { id: 1 };

            await PaymentController.updatePayment(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedPayment);
        });

        it('should return 400 if status is missing', async () => {
            req.params = { id: 1 };
            await PaymentController.updatePayment(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Status are required' });
        });

        it('should return 404 if payment not found', async () => {
            req.body = { status: 'paid' };
            req.params = { id: 1 };
            PaymentService.updatePayment.mockResolvedValue(null);

            await PaymentController.updatePayment(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });
    });
});