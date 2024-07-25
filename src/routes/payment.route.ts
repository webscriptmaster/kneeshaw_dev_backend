import express from "express";

import paymentController from "../controllers/payment.controller";

const router = express.Router();

router.post("/checkout", paymentController.checkout);

export default router;
