import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { Job } from "../../models/job.model";

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

    const jobs = await Job.find({ creatorId: req.user._id })
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
    console.error("job.list.controller getList error: ", error);
  } finally {
    next();
  }
}

/**
 * Create a job
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function create(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        msg: "Only authenticated users can create a new Job."
      });
      return;
    }

    const { _id: creatorId } = req.user;
    const {
      title,
      skills,
      godots,
      databases,
      scope,
      period,
      experience,
      budget,
      location
    } = req.body;

    const newJob = new Job({
      title,
      skills,
      godots,
      databases,
      scope,
      period,
      experience,
      budget,
      location,
      creatorId
    });
    await newJob.save();

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Job is created successfully."
    });
  } catch (error) {
    console.error("job.list.controller create error: ", error);
  } finally {
    next();
  }
}

export default {
  getList,
  create
};
