import express from "express";

import gamePlatformController from "../../controllers/admin/game/platform.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/", adminMiddleware, gamePlatformController.getList);

router.post("/", adminMiddleware, gamePlatformController.create);

router.put("/:_id", adminMiddleware, gamePlatformController.update);

router.delete("/:_id", adminMiddleware, gamePlatformController.destroy);

export default router;
