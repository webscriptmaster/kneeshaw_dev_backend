import express from "express";

import jobBudgetController from "../../controllers/admin/job/budget.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/", adminMiddleware, jobBudgetController.get);

router.put("/", adminMiddleware, jobBudgetController.update);

export default router;
