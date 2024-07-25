import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { JobScope } from "../../../models/job-scope.model";

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
    if (!req.user) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        msg: "Only authenticated administrators can access Job Scope list."
      });
      return;
    }

    const scopes = await JobScope.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: scopes
    });
  } catch (error) {
    console.error("admin.job.scope.controller getList error: ", error);
  } finally {
    next();
  }
}

/**
 * Create a job scope
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
        msg: "Only authenticated administrators can create a new Job Scope."
      });
      return;
    }

    const { _id: creatorId } = req.user;
    const { name, description, enabled } = req.body;

    const newScope = new JobScope({
      name,
      description: description || null,
      enabled,
      creatorId
    });
    await newScope.save();

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Job Scope is created successfully."
    });
  } catch (error) {
    console.error("admin.job.scope.controller create error: ", error);
  } finally {
    next();
  }
}

/**
 * Update a job scope
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
        msg: "Only authenticated administrators can update a Job Scope."
      });
      return;
    }

    const { _id } = req.params;
    const { _id: modifierId } = req.user;
    const { name, description, enabled } = req.body;

    await JobScope.findByIdAndUpdate(
      _id,
      { name, description: description || null, enabled, modifierId },
      { new: true }
    );

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Job Scope is updated successfully."
    });
  } catch (error) {
    console.error("admin.job.scope.controller update error: ", error);
  } finally {
    next();
  }
}

/**
 * Delete a job scope
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
        msg: "Only authenticated administrators can delete a Job Scope."
      });
      return;
    }

    const { _id } = req.params;

    await JobScope.findByIdAndDelete(_id);

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Job Scope is removed successfully."
    });
  } catch (error) {
    console.error("admin.job.scope.controller destroy error: ", error);
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
