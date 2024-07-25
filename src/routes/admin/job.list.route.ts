import express from "express";

import jobListController from "../../controllers/admin/job/list.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/", adminMiddleware, jobListController.getList);

router.delete("/:_id", adminMiddleware, jobListController.destroy);

export default router;
