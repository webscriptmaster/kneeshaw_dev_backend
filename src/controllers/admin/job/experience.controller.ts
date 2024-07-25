import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { JobExperience } from "../../../models/job-experience.model";

/**
 * Get job experience list
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
        msg: "Only authenticated administrators can access Job Experience list."
      });
      return;
    }

    const experiences = await JobExperience.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: experiences
    });
  } catch (error) {
    console.error("admin.job.experience.controller getList error: ", error);
  } finally {
    next();
  }
}

/**
 * Create a job experience
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
        msg: "Only authenticated administrators can create a new Job Experience."
      });
      return;
    }

    const { _id: creatorId } = req.user;
    const { name, description, enabled } = req.body;

    const newExperience = new JobExperience({
      name,
      description: description || null,
      enabled,
      creatorId
    });
    await newExperience.save();

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Job Experience is created successfully."
    });
  } catch (error) {
    console.error("admin.job.experience.controller create error: ", error);
  } finally {
    next();
  }
}

/**
 * Update a job experience
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
        msg: "Only authenticated administrators can update a Job Experience."
      });
      return;
    }

    const { _id } = req.params;
    const { _id: modifierId } = req.user;
    const { name, description, enabled } = req.body;

    await JobExperience.findByIdAndUpdate(
      _id,
      { name, description: description || null, enabled, modifierId },
      { new: true }
    );

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Job Experience is updated successfully."
    });
  } catch (error) {
    console.error("admin.job.experience.controller update error: ", error);
  } finally {
    next();
  }
}

/**
 * Delete a job experience
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
        msg: "Only authenticated administrators can delete a Job Experience."
      });
      return;
    }

    const { _id } = req.params;

    await JobExperience.findByIdAndDelete(_id);

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Job Experience is removed successfully."
    });
  } catch (error) {
    console.error("admin.job.experience.controller destroy error: ", error);
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
