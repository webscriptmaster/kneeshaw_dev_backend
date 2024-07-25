import express from "express";

import authController from "../../controllers/admin/auth.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.post("/login", authController.login);
router.post("/logout", adminMiddleware, authController.logout);
router.post("/regenerate-token", authController.regenerateToken);

export default router;
