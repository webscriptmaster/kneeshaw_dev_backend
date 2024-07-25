import express from "express";

import cookieConsentController from "../controllers/cookie.consent.controller";

const router = express.Router();

router.get("/", cookieConsentController.get);

export default router;
