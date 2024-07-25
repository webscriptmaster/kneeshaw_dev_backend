import express from "express";

import jobListController from "../controllers/job/list.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", authMiddleware, jobListController.getList);

router.post("/", authMiddleware, jobListController.create);

export default router;
