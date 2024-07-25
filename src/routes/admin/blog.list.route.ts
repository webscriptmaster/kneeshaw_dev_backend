import express from "express";

import blogListController from "../../controllers/admin/blog/list.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/:_id", adminMiddleware, blogListController.getById);

router.get("/", adminMiddleware, blogListController.getList);

router.post("/", adminMiddleware, blogListController.create);

router.put("/:_id", adminMiddleware, blogListController.update);

router.delete("/:_id", adminMiddleware, blogListController.destroy);

export default router;
