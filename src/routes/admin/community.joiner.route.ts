import express from "express";

import communityJoinerController from "../../controllers/admin/community/joiner.controller";
import adminMiddleware from "../../middleware/admin.middleware";

const router = express.Router();

router.get("/", adminMiddleware, communityJoinerController.getList);

router.post("/", adminMiddleware, communityJoinerController.create);

router.put("/:_id", adminMiddleware, communityJoinerController.update);

router.delete("/:_id", adminMiddleware, communityJoinerController.destroy);

export default router;
