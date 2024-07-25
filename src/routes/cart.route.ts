import express from "express";

import authMiddleware from "../middleware/auth.middleware";
import cartController from "../controllers/cart.controller";

const router = express.Router();

router.get("/", authMiddleware, cartController.getList);
router.get("/:_id", authMiddleware, cartController.getById);
router.post("/", authMiddleware, cartController.create);

export default router;
