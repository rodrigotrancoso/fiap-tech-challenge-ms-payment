import PaymentController from '../controllers/payment.controller.js';
import express from "express";

const router = express.Router();

router.get("/:id", PaymentController.getPaymentById);
router.get("/", PaymentController.getPayments);
router.post("/", PaymentController.createPayment);
router.patch("/:id", PaymentController.updatePayment);

export default router;