import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { Game, IGame } from "../../models/game.model";

/**
 * Get a game
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const { _id } = req.params;

    const result: IGame | null = await Game.findById(_id);

    res.status(httpStatus.OK).json({
      success: true,
      result
    });
  } catch (error) {
    console.error("game.list.controller getById error: ", error);
  } finally {
    next();
  }
}

/**
 * Get game list
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function getList(req: Request, res: Response, next: NextFunction) {
  try {
    const games = await Game.find({ enabled: true });

    res.status(httpStatus.OK).json({
      success: true,
      result: games
    });
  } catch (error) {
    console.error("game.list.controller getList error: ", error);
  } finally {
    next();
  }
}

export default {
  getById,
  getList
};
