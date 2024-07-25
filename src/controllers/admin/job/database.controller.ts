import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { JobDatabase } from "../../../models/job-database.model";

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
    if (!req.user) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        msg: "Only authenticated administrators can access Job Database list."
      });
      return;
    }

    const databases = await JobDatabase.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: databases
    });
  } catch (error) {
    console.error("admin.job.database.controller getList error: ", error);
  } finally {
    next();
  }
}

/**
 * Create a job database
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
        msg: "Only authenticated administrators can create a new Job Database."
      });
      return;
    }

    const { _id: creatorId } = req.user;
    const { name, description, enabled } = req.body;

    const newDatabase = new JobDatabase({
      name,
      description: description || null,
      enabled,
      creatorId
    });
    await newDatabase.save();

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Job Database is created successfully."
    });
  } catch (error) {
    console.error("admin.job.database.controller create error: ", error);
  } finally {
    next();
  }
}

/**
 * Update a job database
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
        msg: "Only authenticated administrators can update a Job Database."
      });
      return;
    }

    const { _id } = req.params;
    const { _id: modifierId } = req.user;
    const { name, description, enabled } = req.body;

    await JobDatabase.findByIdAndUpdate(
      _id,
      { name, description: description || null, enabled, modifierId },
      { new: true }
    );

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Job Database is updated successfully."
    });
  } catch (error) {
    console.error("admin.job.database.controller update error: ", error);
  } finally {
    next();
  }
}

/**
 * Delete a job database
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
        msg: "Only authenticated administrators can delete a Job Database."
      });
      return;
    }

    const { _id } = req.params;

    await JobDatabase.findByIdAndDelete(_id);

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Job Database is removed successfully."
    });
  } catch (error) {
    console.error("admin.job.database.controller destroy error: ", error);
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
