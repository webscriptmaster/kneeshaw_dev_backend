import express from "express";

import jobExperienceController from "../controllers/job/experience.controller";

const router = express.Router();

router.get("/", jobExperienceController.getList);

export default router;
