import express from "express";

import gameListController from "../../controllers/admin/game/list.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/:_id", adminMiddleware, gameListController.getById);

router.get("/", adminMiddleware, gameListController.getList);

router.post("/", adminMiddleware, gameListController.create);

router.put("/:_id", adminMiddleware, gameListController.update);

router.delete("/:_id", adminMiddleware, gameListController.destroy);

export default router;
