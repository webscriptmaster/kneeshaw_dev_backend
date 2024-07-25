import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { GamePlatform } from "../../../models/game-platform.model";

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
    if (!req.user) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        msg: "Only authenticated administrators can access Game Platform list."
      });
      return;
    }

    const platforms = await GamePlatform.find()
      .collation({ locale: "en" })
      .sort({ name: "asc" });

    res.status(httpStatus.OK).json({
      success: true,
      result: platforms
    });
  } catch (error) {
    console.error("admin.game.platform.controller getList error: ", error);
  } finally {
    next();
  }
}

/**
 * Create a game platform
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
        msg: "Only authenticated administrators can create a new Game Platform."
      });
      return;
    }

    const { _id: creatorId } = req.user;
    const { name, description, enabled } = req.body;

    const newPlatform = new GamePlatform({
      name,
      description,
      enabled,
      creatorId
    });
    await newPlatform.save();

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Game Platform is created successfully."
    });
  } catch (error) {
    console.error("admin.game.platform.controller create error: ", error);
  } finally {
    next();
  }
}

/**
 * Update a game platform
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
        msg: "Only authenticated administrators can update a Game Platform."
      });
      return;
    }

    const { _id } = req.params;
    const { _id: modifierId } = req.user;
    const { name, description, enabled } = req.body;

    await GamePlatform.findByIdAndUpdate(
      _id,
      { name, description, enabled, modifierId },
      { new: true }
    );

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Game Platform is updated successfully."
    });
  } catch (error) {
    console.error("admin.game.platform.controller update error: ", error);
  } finally {
    next();
  }
}

/**
 * Delete a game platform
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
        msg: "Only authenticated administrators can delete a Game Platform."
      });
      return;
    }

    const { _id } = req.params;

    await GamePlatform.findByIdAndDelete(_id);

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Game Platform is removed successfully."
    });
  } catch (error) {
    console.error("admin.game.platform.controller destroy error: ", error);
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
