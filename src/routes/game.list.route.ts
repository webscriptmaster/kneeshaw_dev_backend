import express from "express";

import gameListController from "../controllers/game/list.controller";

const router = express.Router();

router.get("/:_id", gameListController.getById);

router.get("/", gameListController.getList);

export default router;
