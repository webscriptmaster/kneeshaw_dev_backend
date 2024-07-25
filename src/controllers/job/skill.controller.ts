import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { JobSkill } from "../../models/job-skill.model";

/**
 * Get job skill list
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function getList(req: Request, res: Response, next: NextFunction) {
  try {
    const skills = await JobSkill.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: skills
    });
  } catch (error) {
    console.error("job.skill.controller getList error: ", error);
  } finally {
    next();
  }
}

export default {
  getList
};
