import express from "express";

import userController from "../../controllers/admin/user.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/:_id", adminMiddleware, userController.getById);

router.get("/", adminMiddleware, userController.getList);

router.put("/:_id", adminMiddleware, userController.update);

router.delete("/:_id", adminMiddleware, userController.destroy);

export default router;
