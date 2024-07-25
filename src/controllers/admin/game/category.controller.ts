import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { GameCategory } from "../../../models/game-category.model";

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
    if (!req.user) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        msg: "Only authenticated administrators can access Game Category list."
      });
      return;
    }

    const categories = await GameCategory.find()
      .collation({ locale: "en" })
      .sort({ name: "asc" });

    res.status(httpStatus.OK).json({
      success: true,
      result: categories
    });
  } catch (error) {
    console.error("admin.game.category.controller getList error: ", error);
  } finally {
    next();
  }
}

/**
 * Create a game category
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
        msg: "Only authenticated administrators can create a new Game Category."
      });
      return;
    }

    const { _id: creatorId } = req.user;
    const { name, description, enabled } = req.body;

    const newCategory = new GameCategory({
      name,
      description,
      enabled,
      creatorId
    });
    await newCategory.save();

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Game Category is created successfully."
    });
  } catch (error) {
    console.error("admin.game.category.controller create error: ", error);
  } finally {
    next();
  }
}

/**
 * Update a game category
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
        msg: "Only authenticated administrators can update a Game Category."
      });
      return;
    }

    const { _id } = req.params;
    const { _id: modifierId } = req.user;
    const { name, description, enabled } = req.body;

    await GameCategory.findByIdAndUpdate(
      _id,
      { name, description, enabled, modifierId },
      { new: true }
    );

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Game Category is updated successfully."
    });
  } catch (error) {
    console.error("admin.game.category.controller update error: ", error);
  } finally {
    next();
  }
}

/**
 * Delete a game category
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
        msg: "Only authenticated administrators can delete a Game Category."
      });
      return;
    }

    const { _id } = req.params;

    await GameCategory.findByIdAndDelete(_id);

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Game Category is removed successfully."
    });
  } catch (error) {
    console.error("admin.game.category.controller destroy error: ", error);
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
