import express from "express";

import faqController from "../controllers/faq.controller";

const router = express.Router();

router.get("/", faqController.getList);

export default router;
