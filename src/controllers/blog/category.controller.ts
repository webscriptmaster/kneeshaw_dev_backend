import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { BlogCategory } from "../../models/blog-category.model";

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
    const categories = await BlogCategory.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: categories
    });
  } catch (error) {
    console.error("blog.category.controller getList error: ", error);
  } finally {
    next();
  }
}

export default {
  getList
};
