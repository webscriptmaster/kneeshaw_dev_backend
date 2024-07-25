import express from "express";

import gameCategoryController from "../../controllers/admin/game/category.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/", adminMiddleware, gameCategoryController.getList);

router.post("/", adminMiddleware, gameCategoryController.create);

router.put("/:_id", adminMiddleware, gameCategoryController.update);

router.delete("/:_id", adminMiddleware, gameCategoryController.destroy);

export default router;
