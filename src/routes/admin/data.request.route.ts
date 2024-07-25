import express from "express";

import dataRequestController from "../../controllers/admin/data.request.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/", adminMiddleware, dataRequestController.getList);

router.delete("/:_id", adminMiddleware, dataRequestController.destroy);

export default router;
