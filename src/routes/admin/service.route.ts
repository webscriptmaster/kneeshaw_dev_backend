import express from "express";

import serviceController from "../../controllers/admin/service.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/", adminMiddleware, serviceController.getList);

router.post("/", adminMiddleware, serviceController.create);

router.put("/:_id", adminMiddleware, serviceController.update);

router.delete("/:_id", adminMiddleware, serviceController.destroy);

export default router;
