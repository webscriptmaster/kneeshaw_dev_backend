import express from "express";

import serviceController from "../controllers/service.controller";

const router = express.Router();

router.get("/", serviceController.getList);

export default router;
