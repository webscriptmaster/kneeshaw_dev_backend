import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { User } from "../../models/user.model";
import { Job } from "../../models/job.model";
import { Game } from "../../models/game.model";
import { Faq } from "../../models/faq.model";
import { Service } from "../../models/service.model";
import { Blog } from "../../models/blog.model";
import { CommunityJoiner } from "../../models/community-joiner.model";
import { Feedback } from "../../models/feedback.model";
import { DataRequest } from "../../models/data-request.model";

/**
 * Get statistics
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function getStatistics(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        msg: "Only authenticated administrators can access dashboard."
      });
      return;
    }

    const userCount = await User.countDocuments();
    const jobCount = await Job.countDocuments();
    const gameCount = await Game.countDocuments();
    const blogCount = await Blog.countDocuments();
    const serviceCount = await Service.countDocuments();
    const faqCount = await Faq.countDocuments();
    const communityJoinerCount = await CommunityJoiner.countDocuments();
    const feedbackCount = await Feedback.countDocuments();
    const dataRequestCount = await DataRequest.countDocuments();

    res.status(httpStatus.OK).json({
      success: true,
      result: {
        count: {
          user: userCount,
          job: jobCount,
          game: gameCount,
          blog: blogCount,
          service: serviceCount,
          faq: faqCount,
          communityJoiner: communityJoinerCount,
          feedback: feedbackCount,
          dataRequest: dataRequestCount
        }
      }
    });
  } catch (error) {
    console.error("admin.dashboard.controller getStatistics error: ", error);
  } finally {
    next();
  }
}

export default {
  getStatistics
};
