import express from "express";

import blogCategoryController from "../controllers/blog/category.controller";

const router = express.Router();

router.get("/", blogCategoryController.getList);

export default router;
