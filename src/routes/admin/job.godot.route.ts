import express from "express";

import jobGodotController from "../../controllers/admin/job/godot.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/", adminMiddleware, jobGodotController.getList);

router.post("/", adminMiddleware, jobGodotController.create);

router.put("/:_id", adminMiddleware, jobGodotController.update);

router.delete("/:_id", adminMiddleware, jobGodotController.destroy);

export default router;
