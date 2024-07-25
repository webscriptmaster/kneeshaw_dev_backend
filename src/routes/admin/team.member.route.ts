import express from "express";

import teamMemberController from "../../controllers/admin/team.member.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/", adminMiddleware, teamMemberController.getList);

router.post("/", adminMiddleware, teamMemberController.create);

router.put("/:_id", adminMiddleware, teamMemberController.update);

router.delete("/:_id", adminMiddleware, teamMemberController.destroy);

export default router;
