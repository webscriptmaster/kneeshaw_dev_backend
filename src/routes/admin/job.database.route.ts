import express from "express";

import jobDatabaseController from "../../controllers/admin/job/database.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/", adminMiddleware, jobDatabaseController.getList);

router.post("/", adminMiddleware, jobDatabaseController.create);

router.put("/:_id", adminMiddleware, jobDatabaseController.update);

router.delete("/:_id", adminMiddleware, jobDatabaseController.destroy);

export default router;
