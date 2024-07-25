import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { GameCategory } from "../../models/game-category.model";

/**
 * Get game category list
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function getList(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await GameCategory.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: categories
    });
  } catch (error) {
    console.error("game.category.controller getList error: ", error);
  } finally {
    next();
  }
}

export default {
  getList
};
