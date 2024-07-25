import express from "express";

import blogCategoryController from "../../controllers/admin/blog/category.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/", adminMiddleware, blogCategoryController.getList);

router.post("/", adminMiddleware, blogCategoryController.create);

router.put("/:_id", adminMiddleware, blogCategoryController.update);

router.delete("/:_id", adminMiddleware, blogCategoryController.destroy);

export default router;
