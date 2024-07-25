import express from "express";

import blogListController from "../controllers/blog/list.controller";

const router = express.Router();

router.get("/:_id", blogListController.getById);

router.get("/", blogListController.getList);

export default router;
