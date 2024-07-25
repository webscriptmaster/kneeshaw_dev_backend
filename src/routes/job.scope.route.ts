import express from "express";

import jobScopeController from "../controllers/job/scope.controller";

const router = express.Router();

router.get("/", jobScopeController.getList);

export default router;
