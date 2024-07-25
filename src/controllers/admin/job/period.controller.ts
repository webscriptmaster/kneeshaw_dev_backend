import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { JobPeriod } from "../../../models/job-period.model";

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
    if (!req.user) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        msg: "Only authenticated administrators can access Job Period list."
      });
      return;
    }

    const periods = await JobPeriod.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: periods
    });
  } catch (error) {
    console.error("admin.job.period.controller getList error: ", error);
  } finally {
    next();
  }
}

/**
 * Create a job period
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
        msg: "Only authenticated administrators can create a new Job Period."
      });
      return;
    }

    const { _id: creatorId } = req.user;
    const { name, description, enabled } = req.body;

    const newPeriod = new JobPeriod({
      name,
      description: description || null,
      enabled,
      creatorId
    });
    await newPeriod.save();

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Job Period is created successfully."
    });
  } catch (error) {
    console.error("admin.job.period.controller create error: ", error);
  } finally {
    next();
  }
}

/**
 * Update a job period
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function update(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        msg: "Only authenticated administrators can update a Job Period."
      });
      return;
    }

    const { _id } = req.params;
    const { _id: modifierId } = req.user;
    const { name, description, enabled } = req.body;

    await JobPeriod.findByIdAndUpdate(
      _id,
      { name, description: description || null, enabled, modifierId },
      { new: true }
    );

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Job Period is updated successfully."
    });
  } catch (error) {
    console.error("admin.job.period.controller update error: ", error);
  } finally {
    next();
  }
}

/**
 * Delete a job period
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
        msg: "Only authenticated administrators can delete a Job Period."
      });
      return;
    }

    const { _id } = req.params;

    await JobPeriod.findByIdAndDelete(_id);

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Job Period is removed successfully."
    });
  } catch (error) {
    console.error("admin.job.period.controller destroy error: ", error);
  } finally {
    next();
  }
}

export default {
  getList,
  create,
  update,
  destroy
};
