import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { JobSkill } from "../../../models/job-skill.model";

/**
 * Get job skill list
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
        msg: "Only authenticated administrators can access Job Skill list."
      });
      return;
    }

    const skills = await JobSkill.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: skills
    });
  } catch (error) {
    console.error("admin.job.skill.controller getList error: ", error);
  } finally {
    next();
  }
}

/**
 * Create a job skill
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
        msg: "Only authenticated administrators can create a new Job Skill."
      });
      return;
    }

    const { _id: creatorId } = req.user;
    const { name, description, enabled } = req.body;

    const newSkill = new JobSkill({
      name,
      description: description || null,
      enabled,
      creatorId
    });
    await newSkill.save();

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Job Skill is created successfully."
    });
  } catch (error) {
    console.error("admin.job.skill.controller create error: ", error);
  } finally {
    next();
  }
}

/**
 * Update a job skill
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
        msg: "Only authenticated administrators can update a Job Skill."
      });
      return;
    }

    const { _id } = req.params;
    const { _id: modifierId } = req.user;
    const { name, description, enabled } = req.body;

    await JobSkill.findByIdAndUpdate(
      _id,
      { name, description: description || null, enabled, modifierId },
      { new: true }
    );

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Job Skill is updated successfully."
    });
  } catch (error) {
    console.error("admin.job.skill.controller update error: ", error);
  } finally {
    next();
  }
}

/**
 * Delete a job skill
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
        msg: "Only authenticated administrators can delete a Job Skill."
      });
      return;
    }

    const { _id } = req.params;

    await JobSkill.findByIdAndDelete(_id);

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Job Skill is removed successfully."
    });
  } catch (error) {
    console.error("admin.job.skill.controller destroy error: ", error);
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
