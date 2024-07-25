import express from "express";

import authMiddleware from "../middleware/auth.middleware";
import chatController from "../controllers/chat.controller";

const router = express.Router();

router.get("/response", authMiddleware, chatController.getResponse);

export default router;
