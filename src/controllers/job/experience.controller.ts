import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { JobExperience } from "../../models/job-experience.model";

/**
 * Get job experience list
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function getList(req: Request, res: Response, next: NextFunction) {
  try {
    const experiences = await JobExperience.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: experiences
    });
  } catch (error) {
    console.error("job.experience.controller getList error: ", error);
  } finally {
    next();
  }
}

export default {
  getList
};
