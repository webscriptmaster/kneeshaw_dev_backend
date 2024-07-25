import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import path from "path";

import upload from "../../services/upload.service";
import { TeamMember } from "../../models/team-member.model";

/**
 * Get team member list
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
        msg: "Only authenticated administrators can access Team member list."
      });
      return;
    }

    const members = await TeamMember.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: members
    });
  } catch (error) {
    console.error("admin.team.member.controller getList error: ", error);
  } finally {
    next();
  }
}

/**
 * Create a team member
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function create(req: Request, res: Response, next: NextFunction) {
  upload(`teams${path.sep}members`).any()(req, res, async (err) => {
    if (err) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Something went wrong while uploading avatar",
        code: err.code
      });
      return;
    }

    try {
      if (!req.user) {
        res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          msg: "Only authenticated administrators can create a new Team Member."
        });
        return;
      }

      const { _id: creatorId } = req.user;
      const { firstName, lastName, position, enabled, memo } = req.body;

      let avatar = null;
      if (Array.isArray(req.files) && req.files.length > 0) {
        avatar = req.files[0].path.replace(/\\/g, "/");
      }

      const newMember = new TeamMember({
        avatar,
        firstName,
        lastName,
        position,
        enabled,
        memo,
        creatorId
      });
      await newMember.save();

      res.status(httpStatus.OK).json({
        success: true,
        msg: "Team Member is created successfully."
      });
    } catch (error) {
      console.error("admin.team.member.controller create error: ", error);
    } finally {
      next();
    }
  });
}

/**
 * Update a team member
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function update(req: Request, res: Response, next: NextFunction) {
  upload(`teams${path.sep}members`).any()(req, res, async (err) => {
    if (err) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Something went wrong while uploading avatar",
        code: err.code
      });
      return;
    }

    try {
      if (!req.user) {
        res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          msg: "Only authenticated administrators can update a Team Member."
        });
        return;
      }

      const { _id } = req.params;
      const { _id: modifierId } = req.user;
      const { firstName, lastName, position, enabled, memo } = req.body;
      let updateItems: Record<string, any> = {
        firstName,
        lastName,
        position,
        enabled,
        memo,
        modifierId
      };

      let avatar = null;
      if (Array.isArray(req.files) && req.files.length > 0) {
        avatar = req.files[0].path.replace(/\\/g, "/");
      }

      if (avatar) {
        updateItems = { ...updateItems, avatar };
      }

      await TeamMember.findByIdAndUpdate(_id, updateItems, { new: true });

      res.status(httpStatus.OK).json({
        success: true,
        msg: "Team Member is updated successfully."
      });
    } catch (error) {
      console.error("admin.team.member.controller update error: ", error);
    } finally {
      next();
    }
  });
}

/**
 * Delete a team member
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
        msg: "Only authenticated administrators can delete a Team Member."
      });
      return;
    }

    const { _id } = req.params;

    await TeamMember.findByIdAndDelete(_id);

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Team Member is removed successfully."
    });
  } catch (error) {
    console.error("admin.team.member.controller destroy error: ", error);
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
