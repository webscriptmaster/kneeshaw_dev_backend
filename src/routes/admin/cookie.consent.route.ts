import express from "express";

import cookieConsentController from "../../controllers/admin/cookie.consent.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/", adminMiddleware, cookieConsentController.get);

router.put("/", adminMiddleware, cookieConsentController.update);

export default router;
