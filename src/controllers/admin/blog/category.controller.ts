import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { BlogCategory } from "../../../models/blog-category.model";

/**
 * Get blog category list
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
        msg: "Only authenticated administrators can access Blog Category list."
      });
      return;
    }

    const categories = await BlogCategory.find()
      .collation({ locale: "en" })
      .sort({ name: "asc" });

    res.status(httpStatus.OK).json({
      success: true,
      result: categories
    });
  } catch (error) {
    console.error("admin.blog.category.controller getList error: ", error);
  } finally {
    next();
  }
}

/**
 * Create a blog category
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
        msg: "Only authenticated administrators can create a new Blog Category."
      });
      return;
    }

    const { _id: creatorId } = req.user;
    const { name, description, enabled } = req.body;

    const newCategory = new BlogCategory({
      name,
      description,
      enabled,
      creatorId
    });
    await newCategory.save();

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Blog Category is created successfully."
    });
  } catch (error) {
    console.error("admin.blog.category.controller create error: ", error);
  } finally {
    next();
  }
}

/**
 * Update a blog category
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
        msg: "Only authenticated administrators can update a Blog Category."
      });
      return;
    }

    const { _id } = req.params;
    const { _id: modifierId } = req.user;
    const { name, description, enabled } = req.body;

    await BlogCategory.findByIdAndUpdate(
      _id,
      { name, description, enabled, modifierId },
      { new: true }
    );

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Blog Category is updated successfully."
    });
  } catch (error) {
    console.error("admin.blog.category.controller update error: ", error);
  } finally {
    next();
  }
}

/**
 * Delete a blog category
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
        msg: "Only authenticated administrators can delete a Blog Category."
      });
      return;
    }

    const { _id } = req.params;

    await BlogCategory.findByIdAndDelete(_id);

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Blog Category is removed successfully."
    });
  } catch (error) {
    console.error("admin.blog.category.controller destroy error: ", error);
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
