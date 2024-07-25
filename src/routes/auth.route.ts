import express from "express";

import authController from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.post("/login", authController.login);
router.post("/logout", authMiddleware, authController.logout);

router.post("/register", authController.register);
router.post("/verify-register-token", authController.verifyRegisterToken);

router.post("/send-reset-link", authController.sendResetLink);
router.post("/verify-reset-token", authController.verifyResetToken);
router.post("/reset-password-by-token", authController.resetPasswordByToken);

router.post("/send-reset-code", authController.sendResetCode);
router.post("/verify-reset-code", authController.verifyResetCode);

router.put("/update-profile", authMiddleware, authController.updateProfile);
router.put("/change-email", authMiddleware, authController.changeEmail);
router.put("/change-password", authMiddleware, authController.changePassword);

router.post(
  "/send-data-request",
  authMiddleware,
  authController.sendDataRequest
);

export default router;
