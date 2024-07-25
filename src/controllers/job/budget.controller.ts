import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { JobBudget } from "../../models/job-budget.model";

/**
 * Get job budget
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const budget = await JobBudget.findOne();

    res.status(httpStatus.OK).json({
      success: true,
      result: budget
    });
  } catch (error) {
    console.error("job.budget.controller get error: ", error);
  } finally {
    next();
  }
}

export default {
  get
};
