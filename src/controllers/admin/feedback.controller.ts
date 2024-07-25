import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { Feedback } from "../../models/feedback.model";

/**
 * Get feedback list
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
        msg: "Only authenticated administrators can access Feedback list."
      });
      return;
    }

    const feedbacks = await Feedback.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: feedbacks
    });
  } catch (error) {
    console.error("admin.feedback.controller getList error: ", error);
  } finally {
    next();
  }
}

/**
 * Create a feedback
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
        msg: "Only authenticated administrators can create a new Feedback."
      });
      return;
    }

    const { _id: creatorId } = req.user;
    const { fullName, email, message, from, link, isRead } = req.body;

    const newFeedback = new Feedback({
      fullName,
      email,
      message,
      from,
      link,
      isRead,
      creatorId
    });
    await newFeedback.save();

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Feedback is created successfully."
    });
  } catch (error) {
    console.error("admin.feedback.controller create error: ", error);
  } finally {
    next();
  }
}

/**
 * Update a feedback
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
        msg: "Only authenticated administrators can update a Feedback."
      });
      return;
    }

    const { _id } = req.params;
    const { _id: modifierId } = req.user;
    const { fullName, email, message, from, link, isRead } = req.body;

    await Feedback.findByIdAndUpdate(
      _id,
      { fullName, email, message, from, link, isRead, modifierId },
      { new: true }
    );

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Feedback is updated successfully."
    });
  } catch (error) {
    console.error("admin.feedback.controller update error: ", error);
  } finally {
    next();
  }
}

/**
 * Delete a feedback
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
        msg: "Only authenticated administrators can delete a Feedback."
      });
      return;
    }

    const { _id } = req.params;

    await Feedback.findByIdAndDelete(_id);

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Feedback is removed successfully."
    });
  } catch (error) {
    console.error("admin.feedback.controller destroy error: ", error);
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
