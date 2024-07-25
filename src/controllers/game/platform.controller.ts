import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { GamePlatform } from "../../models/game-platform.model";

/**
 * Get game platform list
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function getList(req: Request, res: Response, next: NextFunction) {
  try {
    const platforms = await GamePlatform.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: platforms
    });
  } catch (error) {
    console.error("game.platform.controller getList error: ", error);
  } finally {
    next();
  }
}

export default {
  getList
};
