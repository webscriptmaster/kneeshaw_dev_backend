import express, { NextFunction, Request, Response } from "express";

import authRoutes from "./auth.route";
import cookieConsentRoutes from "./cookie.consent.route";

import cartRoutes from "./cart.route";
import paymentRoutes from "./payment.route";
import chatRoutes from "./chat.route";

import gameCategoryRoutes from "./game.category.route";
import gamePlatformRoutes from "./game.platform.route";
import gameListRoutes from "./game.list.route";

import blogCategoryRoutes from "./blog.category.route";
import blogListRoutes from "./blog.list.route";

import serviceRoutes from "./service.route";
import faqRoutes from "./faq.route";

import teamMemberRoutes from "./team.member.route";
import communityRoute from "./community.route";
import feedbackRoutes from "./feedback.route";

import jobSkillRoutes from "./job.skill.route";
import jobGodotRoutes from "./job.godot.route";
import jobDatabaseRoutes from "./job.database.route";
import jobScopeRoutes from "./job.scope.route";
import jobPeriodRoutes from "./job.period.route";
import jobExperienceRoutes from "./job.experience.route";
import jobBudgetRoutes from "./job.budget.route";
import jobListRoutes from "./job.list.route";

import adminRoutes from "./admin";

import { SITE_TITLE } from "../utils/const.util";

const router = express.Router();

router.get("/", (_req: Request, res: Response, _next: NextFunction) => {
  res.send(`😀 Welcome to the ${SITE_TITLE} API server!`);
});

router.use("/api/auth", authRoutes);
router.use("/api/cookie/consent", cookieConsentRoutes);

router.use("/api/cart", cartRoutes);
router.use("/api/payment", paymentRoutes);
router.use("/api/chat", chatRoutes);

router.use("/api/game/category", gameCategoryRoutes);
router.use("/api/game/platform", gamePlatformRoutes);
router.use("/api/game/list", gameListRoutes);

router.use("/api/blog/category", blogCategoryRoutes);
router.use("/api/blog/list", blogListRoutes);

router.use("/api/service", serviceRoutes);
router.use("/api/faq", faqRoutes);

router.use("/api/team/member", teamMemberRoutes);
router.use("/api/community", communityRoute);
router.use("/api/feedback", feedbackRoutes);

router.use("/api/job/skill", jobSkillRoutes);
router.use("/api/job/godot", jobGodotRoutes);
router.use("/api/job/database", jobDatabaseRoutes);
router.use("/api/job/scope", jobScopeRoutes);
router.use("/api/job/period", jobPeriodRoutes);
router.use("/api/job/experience", jobExperienceRoutes);
router.use("/api/job/budget", jobBudgetRoutes);
router.use("/api/job/list", jobListRoutes);

router.use("/api/admin", adminRoutes);

export default router;
