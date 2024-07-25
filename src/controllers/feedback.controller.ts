import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { Feedback } from "../models/feedback.model";

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
    const creatorId = req?.user?._id ?? null;
    const { fullName, email, message, from, link } = req.body;

    const newFeedback = new Feedback({
      fullName,
      email,
      message,
      from,
      link,
      isRead: false,
      creatorId
    });
    await newFeedback.save();

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Feedback is created successfully."
    });
  } catch (error) {
    console.error("feedback.controller create error: ", error);
  } finally {
    next();
  }
}

export default {
  create
};
