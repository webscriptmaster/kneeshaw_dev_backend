import express from "express";

import feedbackController from "../controllers/feedback.controller";

const router = express.Router();

router.post("/", feedbackController.create);

export default router;
