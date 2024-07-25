import express from "express";

import jobPeriodController from "../controllers/job/period.controller";

const router = express.Router();

router.get("/", jobPeriodController.getList);

export default router;
