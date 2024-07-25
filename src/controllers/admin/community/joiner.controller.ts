import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { CommunityJoiner } from "../../../models/community-joiner.model";

/**
 * Get community joiners list
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
        msg: "Only authenticated administrators can access Community Joiners list."
      });
      return;
    }

    const joiners = await CommunityJoiner.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: joiners
    });
  } catch (error) {
    console.error("admin.community.joiner.controller getList error: ", error);
  } finally {
    next();
  }
}

/**
 * Create a community joiner
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
        msg: "Only authenticated administrators can create a new Community Joiner."
      });
      return;
    }

    const { _id: creatorId } = req.user;
    const { email } = req.body;

    const communityJoiner = await CommunityJoiner.findOne({ email });

    if (communityJoiner) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "The email is already joined in our community."
      });
      return;
    }

    const newJoiner = new CommunityJoiner({
      email,
      creatorId
    });
    await newJoiner.save();

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Community Joiner is created successfully."
    });
  } catch (error) {
    console.error("admin.community.joiner.controller create error: ", error);
  } finally {
    next();
  }
}

/**
 * Update a community joiner
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
        msg: "Only authenticated administrators can update a Community Joiner."
      });
      return;
    }

    const { _id } = req.params;
    const { _id: modifierId } = req.user;
    const { email } = req.body;

    const communityJoiner = await CommunityJoiner.findOne({
      email,
      _id: { $ne: _id }
    });

    if (communityJoiner) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "The email is already joined in our community."
      });
      return;
    }

    await CommunityJoiner.findByIdAndUpdate(
      _id,
      { email, modifierId },
      { new: true }
    );

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Community Joiner is updated successfully."
    });
  } catch (error) {
    console.error("admin.community.joiner.controller update error: ", error);
  } finally {
    next();
  }
}

/**
 * Delete a community joiner
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
        msg: "Only authenticated administrators can delete a Community Joiner."
      });
      return;
    }

    const { _id } = req.params;

    await CommunityJoiner.findByIdAndDelete(_id);

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Community Joiner is removed successfully."
    });
  } catch (error) {
    console.error("admin.community.joiner.controller destroy error: ", error);
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
