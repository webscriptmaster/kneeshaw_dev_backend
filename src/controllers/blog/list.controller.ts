import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { Blog } from "../../models/blog.model";

/**
 * Get a blog
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const { _id } = req.params;

    const result = await Blog.findById(_id).populate("game");

    res.status(httpStatus.OK).json({
      success: true,
      result
    });
  } catch (error) {
    console.error("blog.list.controller getById error: ", error);
  } finally {
    next();
  }
}

/**
 * Get blog list
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function getList(req: Request, res: Response, next: NextFunction) {
  try {
    const blogs = await Blog.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: blogs
    });
  } catch (error) {
    console.error("blog.list.controller getList error: ", error);
  } finally {
    next();
  }
}

export default {
  getById,
  getList
};
