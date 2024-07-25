import express from "express";

import jobSkillController from "../../controllers/admin/job/skill.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/", adminMiddleware, jobSkillController.getList);

router.post("/", adminMiddleware, jobSkillController.create);

router.put("/:_id", adminMiddleware, jobSkillController.update);

router.delete("/:_id", adminMiddleware, jobSkillController.destroy);

export default router;
