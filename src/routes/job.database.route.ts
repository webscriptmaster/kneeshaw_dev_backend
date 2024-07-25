import express from "express";

import jobDatabaseController from "../controllers/job/database.controller";

const router = express.Router();

router.get("/", jobDatabaseController.getList);

export default router;
