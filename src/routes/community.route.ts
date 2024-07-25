import express from "express";

import communityController from "../controllers/community.controller";

const router = express.Router();

router.post("/join", communityController.join);

export default router;
