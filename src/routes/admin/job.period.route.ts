import express from "express";

import jobPeriodController from "../../controllers/admin/job/period.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/", adminMiddleware, jobPeriodController.getList);

router.post("/", adminMiddleware, jobPeriodController.create);

router.put("/:_id", adminMiddleware, jobPeriodController.update);

router.delete("/:_id", adminMiddleware, jobPeriodController.destroy);

export default router;
