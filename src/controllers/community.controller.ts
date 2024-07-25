import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { CommunityJoiner } from "../models/community-joiner.model";
import { APP_ENV, SITE_TITLE } from "../utils/const.util";
import defaultConfig from "../config/default.config";
import { sendEmail } from "../services/email.service";

/**
 * Join the community
 *
 * @param req
 * @param res
 * @param next
 */
async function join(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;

    const communityJoiner = await CommunityJoiner.findOne({ email });

    if (communityJoiner) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "You've already joined in our community."
      });
      return;
    }

    const creatorId = req?.user?._id ?? null;

    const newCommunityJoiner = new CommunityJoiner({ email, creatorId });
    await newCommunityJoiner.save();

    if (defaultConfig.app.env === APP_ENV.PRODUCTION) {
      await sendEmail({
        to: email,
        subject: `Welcome to ${SITE_TITLE}`,
        text: `Hi. Welcome to ${SITE_TITLE}. You have been successfully joined in our community.`,
        html: `Hi. Welcome to ${SITE_TITLE}. You have been successfully joined in our community.`
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      msg: "You've successfully joined in our community."
    });
  } catch (error) {
    console.error("community.controller join error: ", error);
  } finally {
    next();
  }
}

export default {
  join
};
