import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { JobDatabase } from "../../models/job-database.model";

/**
 * Get job database list
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function getList(req: Request, res: Response, next: NextFunction) {
  try {
    const databases = await JobDatabase.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: databases
    });
  } catch (error) {
    console.error("job.database.controller getList error: ", error);
  } finally {
    next();
  }
}

export default {
  getList
};
