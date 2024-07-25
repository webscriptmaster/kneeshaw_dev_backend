import express from "express";

import gamePlatformController from "../controllers/game/platform.controller";

const router = express.Router();

router.get("/", gamePlatformController.getList);

export default router;
