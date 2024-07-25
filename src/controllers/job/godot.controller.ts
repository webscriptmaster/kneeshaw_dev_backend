import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { JobGodot } from "../../models/job-godot.model";

/**
 * Get job godot list
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function getList(req: Request, res: Response, next: NextFunction) {
  try {
    const godots = await JobGodot.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: godots
    });
  } catch (error) {
    console.error("job.godot.controller getList error: ", error);
  } finally {
    next();
  }
}

export default {
  getList
};
