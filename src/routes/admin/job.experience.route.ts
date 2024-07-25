import express from "express";

import jobExperienceController from "../../controllers/admin/job/experience.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/", adminMiddleware, jobExperienceController.getList);

router.post("/", adminMiddleware, jobExperienceController.create);

router.put("/:_id", adminMiddleware, jobExperienceController.update);

router.delete("/:_id", adminMiddleware, jobExperienceController.destroy);

export default router;
