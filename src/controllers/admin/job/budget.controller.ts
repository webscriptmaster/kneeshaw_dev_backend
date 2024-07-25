import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { JobBudget } from "../../../models/job-budget.model";

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
    if (!req.user) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        msg: "Only authenticated administrators can access Job Budget."
      });
      return;
    }

    let budget = await JobBudget.findOne();

    if (!budget) {
      const { _id: creatorId } = req.user;

      const newBudget = new JobBudget({
        fixedMin: 0,
        fixedMax: 10000,
        rateMin: 0,
        rateMax: 200,
        creatorId
      });
      await newBudget.save();

      budget = await JobBudget.findOne();
    }

    res.status(httpStatus.OK).json({
      success: true,
      result: budget
    });
  } catch (error) {
    console.error("admin.job.budget.controller get error: ", error);
  } finally {
    next();
  }
}

/**
 * Update a job budget
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
        msg: "Only authenticated administrators can update a Job Budget."
      });
      return;
    }

    const { _id: modifierId } = req.user;
    const { fixedMin, fixedMax, rateMin, rateMax } = req.body;

    await JobBudget.findOneAndUpdate(
      {},
      { fixedMin, fixedMax, rateMin, rateMax, modifierId },
      { new: true }
    );

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Job Budget is updated successfully."
    });
  } catch (error) {
    console.error("admin.job.budget.controller update error: ", error);
  } finally {
    next();
  }
}

export default {
  get,
  update
};
