import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { TeamMember } from "../models/team-member.model";

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
    const members = await TeamMember.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: members
    });
  } catch (error) {
    console.error("team.member.controller getList error: ", error);
  } finally {
    next();
  }
}

export default {
  getList
};
