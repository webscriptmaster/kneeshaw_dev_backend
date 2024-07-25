import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { JobGodot } from "../../../models/job-godot.model";

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
    if (!req.user) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        msg: "Only authenticated administrators can access Job Godot list."
      });
      return;
    }

    const godots = await JobGodot.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: godots
    });
  } catch (error) {
    console.error("admin.job.godot.controller getList error: ", error);
  } finally {
    next();
  }
}

/**
 * Create a job godot
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
        msg: "Only authenticated administrators can create a new Job Godot."
      });
      return;
    }

    const { _id: creatorId } = req.user;
    const { name, description, enabled } = req.body;

    const newGodot = new JobGodot({
      name,
      description: description || null,
      enabled,
      creatorId
    });
    await newGodot.save();

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Job Godot is created successfully."
    });
  } catch (error) {
    console.error("admin.job.godot.controller create error: ", error);
  } finally {
    next();
  }
}

/**
 * Update a job godot
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
        msg: "Only authenticated administrators can update a Job Godot."
      });
      return;
    }

    const { _id } = req.params;
    const { _id: modifierId } = req.user;
    const { name, description, enabled } = req.body;

    await JobGodot.findByIdAndUpdate(
      _id,
      { name, description: description || null, enabled, modifierId },
      { new: true }
    );

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Job Godot is updated successfully."
    });
  } catch (error) {
    console.error("admin.job.godot.controller update error: ", error);
  } finally {
    next();
  }
}

/**
 * Delete a job godot
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
        msg: "Only authenticated administrators can delete a Job Godot."
      });
      return;
    }

    const { _id } = req.params;

    await JobGodot.findByIdAndDelete(_id);

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Job Godot is removed successfully."
    });
  } catch (error) {
    console.error("admin.job.godot.controller destroy error: ", error);
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
