import express from "express";

import teamMemberController from "../controllers/team.member.controller";

const router = express.Router();

router.get("/", teamMemberController.getList);

export default router;
