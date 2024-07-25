import express from "express";

import dashboardController from "../../controllers/admin/dashboard.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/statistics", adminMiddleware, dashboardController.getStatistics);

export default router;
