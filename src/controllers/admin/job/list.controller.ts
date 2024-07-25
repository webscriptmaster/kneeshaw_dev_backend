import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { Job } from "../../../models/job.model";

/**
 * Get job list
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function getList(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        msg: "Only authenticated administrators can access Job list."
      });
      return;
    }

    const jobs = await Job.find()
      .populate("skills")
      .populate("godots")
      .populate("databases")
      .populate("scope")
      .populate("period")
      .populate("experience");

    res.status(httpStatus.OK).json({
      success: true,
      result: jobs
    });
  } catch (error) {
    console.error("admin.job.list.controller getList error: ", error);
  } finally {
    next();
  }
}

/**
 * Delete a job
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        msg: "Only authenticated administrators can delete a Job."
      });
      return;
    }

    const { _id } = req.params;

    await Job.findByIdAndDelete(_id);

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Job is removed successfully."
    });
  } catch (error) {
    console.error("admin.job.list.controller destroy error: ", error);
  } finally {
    next();
  }
}

export default {
  getList,
  destroy
};
