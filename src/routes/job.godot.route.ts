import express from "express";

import jobGodotController from "../controllers/job/godot.controller";

const router = express.Router();

router.get("/", jobGodotController.getList);

export default router;
