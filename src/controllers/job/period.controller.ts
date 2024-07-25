import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { JobPeriod } from "../../models/job-period.model";

/**
 * Get job period list
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function getList(req: Request, res: Response, next: NextFunction) {
  try {
    const periods = await JobPeriod.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: periods
    });
  } catch (error) {
    console.error("job.period.controller getList error: ", error);
  } finally {
    next();
  }
}

export default {
  getList
};
