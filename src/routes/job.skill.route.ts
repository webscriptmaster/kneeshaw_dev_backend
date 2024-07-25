import express from "express";

import jobSkillController from "../controllers/job/skill.controller";

const router = express.Router();

router.get("/", jobSkillController.getList);

export default router;
