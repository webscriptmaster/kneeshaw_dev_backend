import express from "express";

import feedbackController from "../../controllers/admin/feedback.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/", adminMiddleware, feedbackController.getList);

router.post("/", adminMiddleware, feedbackController.create);

router.put("/:_id", adminMiddleware, feedbackController.update);

router.delete("/:_id", adminMiddleware, feedbackController.destroy);

export default router;
