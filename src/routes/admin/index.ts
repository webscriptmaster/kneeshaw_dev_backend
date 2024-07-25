import express from "express";

import authRoutes from "./auth.route";

import dashboardRoutes from "./dashboard.route";

import userRoutes from "./user.route";

import gameCategoryRoutes from "./game.category.route";
import gamePlatformRoutes from "./game.platform.route";
import gameListRoutes from "./game.list.route";

import jobSkillRoutes from "./job.skill.route";
import jobDatabaseRoutes from "./job.database.route";
import jobGodotRoutes from "./job.godot.route";
import jobScopeRoutes from "./job.scope.route";
import jobPeriodRoutes from "./job.period.route";
import jobExperienceRoutes from "./job.experience.route";
import jobBudgetRoutes from "./job.budget.route";
import jobListRoutes from "./job.list.route";

import blogCategoryRoutes from "./blog.category.route";
import blogListRoutes from "./blog.list.route";

import serviceRoutes from "./service.route";
import faqRoutes from "./faq.route";
import teamMemberRoutes from "./team.member.route";
import communityJoinerRoutes from "./community.joiner.route";
import feedbackRoutes from "./feedback.route";
import dataRequestRoutes from "./data.request.route";
import cookieConsentRoutes from "./cookie.consent.route";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/dashboard", dashboardRoutes);

router.use("/user", userRoutes);

router.use("/game/category", gameCategoryRoutes);
router.use("/game/platform", gamePlatformRoutes);
router.use("/game/list", gameListRoutes);

router.use("/job/skill", jobSkillRoutes);
router.use("/job/database", jobDatabaseRoutes);
router.use("/job/godot", jobGodotRoutes);
router.use("/job/scope", jobScopeRoutes);
router.use("/job/period", jobPeriodRoutes);
router.use("/job/experience", jobExperienceRoutes);
router.use("/job/budget", jobBudgetRoutes);
router.use("/job/list", jobListRoutes);

router.use("/blog/category", blogCategoryRoutes);
router.use("/blog/list", blogListRoutes);

router.use("/service", serviceRoutes);
router.use("/faq", faqRoutes);
router.use("/team/member", teamMemberRoutes);
router.use("/community/joiner", communityJoinerRoutes);
router.use("/feedback", feedbackRoutes);
router.use("/data/request", dataRequestRoutes);
router.use("/cookie/consent", cookieConsentRoutes);

export default router;
