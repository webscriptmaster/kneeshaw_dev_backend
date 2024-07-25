import express from "express";

import gameCategoryController from "../controllers/game/category.controller";

const router = express.Router();

router.get("/", gameCategoryController.getList);

export default router;
