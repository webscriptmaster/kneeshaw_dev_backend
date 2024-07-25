import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { JobScope } from "../../models/job-scope.model";

/**
 * Get job scope list
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function getList(req: Request, res: Response, next: NextFunction) {
  try {
    const scopes = await JobScope.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: scopes
    });
  } catch (error) {
    console.error("job.scope.controller getList error: ", error);
  } finally {
    next();
  }
}

export default {
  getList
};
