import express from "express";

import jobBudgetController from "../controllers/job/budget.controller";

const router = express.Router();

router.get("/", jobBudgetController.get);

export default router;
