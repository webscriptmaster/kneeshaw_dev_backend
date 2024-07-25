import express from "express";

import faqController from "../../controllers/admin/faq.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/", adminMiddleware, faqController.getList);

router.post("/", adminMiddleware, faqController.create);

router.put("/:_id", adminMiddleware, faqController.update);

router.delete("/:_id", adminMiddleware, faqController.destroy);

export default router;
