import express from "express";

import jobScopeController from "../../controllers/admin/job/scope.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/", adminMiddleware, jobScopeController.getList);

router.post("/", adminMiddleware, jobScopeController.create);

router.put("/:_id", adminMiddleware, jobScopeController.update);

router.delete("/:_id", adminMiddleware, jobScopeController.destroy);

export default router;
