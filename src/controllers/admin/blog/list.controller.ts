import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { Blog } from "../../../models/blog.model";
import upload from "../../../services/upload.service";
import { NONE } from "../../../utils/const.util";

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
    if (!req.user) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        msg: "Only authenticated administrators can access a Blog."
      });
      return;
    }

    const { _id } = req.params;

    const result = await Blog.findById(_id);

    res.status(httpStatus.OK).json({
      success: true,
      result
    });
  } catch (error) {
    console.error("admin.blog.list.controller getById error: ", error);
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
    if (!req.user) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        msg: "Only authenticated administrators can access Blog list."
      });
      return;
    }

    const blogs = await Blog.find()
      .collation({ locale: "en" })
      .sort({ title: "asc" });

    res.status(httpStatus.OK).json({
      success: true,
      result: blogs
    });
  } catch (error) {
    console.error("admin.blog.list.controller getList error: ", error);
  } finally {
    next();
  }
}

/**
 * Create a blog
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function create(req: Request, res: Response, next: NextFunction) {
  upload("blogs").any()(req, res, async (err: any) => {
    if (err) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Something went wrong while uploading files",
        code: err.code
      });
      return;
    }

    try {
      if (!req.user) {
        res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          msg: "Only authenticated administrators can create a new Blog."
        });
        return;
      }

      const { _id: creatorId } = req.user;
      const {
        enabled,

        category,
        game,

        title,
        description,
        details,

        features
      } = req.body;

      let thumbnailSmall = null;
      let thumbnailLarge = null;
      let screenshots: string[] = [];
      let featuresThumbnails = null;

      if (Array.isArray(req.files) && req.files.length > 0) {
        thumbnailSmall = req.files
          .filter((f) => f.fieldname === "thumbnail[small]")[0]
          .path.replace(/\\/g, "/");
        thumbnailLarge = req.files
          .filter((f) => f.fieldname === "thumbnail[large]")[0]
          .path.replace(/\\/g, "/");
        screenshots = req.files
          .filter((f) => f.fieldname === "screenshots[]")
          .map((f) => f.path.replace(/\\/g, "/"));
        featuresThumbnails = req.files.filter((f) =>
          f.fieldname.includes("features")
        );
      }

      featuresThumbnails?.forEach((ft) => {
        const splittedFieldname = ft.fieldname
          .replace("features[", "")
          .split("][");
        const index = Number(splittedFieldname[0]);
        features[index].thumbnail = ft.path.replace(/\\/g, "/");
      });

      const newBlog = new Blog({
        enabled,

        category: category === NONE ? null : category,
        game: game === NONE ? null : game,

        title,
        description,
        details,

        thumbnail: {
          small: thumbnailSmall,
          large: thumbnailLarge
        },
        screenshots,

        features,

        creatorId
      });
      await newBlog.save();

      res.status(httpStatus.OK).json({
        success: true,
        msg: "Blog is created successfully."
      });
    } catch (error) {
      console.error("admin.blog.list.controller create error: ", error);
    } finally {
      next();
    }
  });
}

/**
 * Update a game
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function update(req: Request, res: Response, next: NextFunction) {
  upload("games").any()(req, res, async (err: any) => {
    if (err) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Something went wrong while uploading",
        code: err.code
      });
      return;
    }

    try {
      if (!req.user) {
        res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          msg: "Only authenticated administrators can update a Blog."
        });
        return;
      }

      const { _id } = req.params;
      const { _id: modifierId } = req.user;
      const {
        enabled,

        category,
        game,

        title,
        description,
        details,

        features
      } = req.body;

      let updateItems: Record<string, any> = {
        enabled,

        category: category === NONE ? null : category,
        game: game === NONE ? null : game,

        title,
        description,
        details,

        features,

        modifierId
      };

      let thumbnailSmall = null;
      let thumbnailLarge = null;
      let screenshots: string[] = [];
      let featuresThumbnails = null;

      if (Array.isArray(req.files) && req.files.length > 0) {
        thumbnailSmall = req.files
          .filter((f) => f.fieldname === "thumbnail[small]")[0]
          ?.path.replace(/\\/g, "/");
        thumbnailLarge = req.files
          .filter((f) => f.fieldname === "thumbnail[large]")[0]
          ?.path.replace(/\\/g, "/");
        screenshots = req.files
          .filter((f) => f.fieldname === "screenshots[]")
          .map((f) => f.path.replace(/\\/g, "/"));
        featuresThumbnails = req.files.filter((f) =>
          f.fieldname.includes("features")
        );
      }

      if (thumbnailSmall) {
        updateItems = {
          ...updateItems,
          thumbnail: {
            ...updateItems.thumbnail,
            small: thumbnailSmall
          }
        };
      }

      if (thumbnailLarge) {
        updateItems = {
          ...updateItems,
          thumbnail: {
            ...updateItems.thumbnail,
            large: thumbnailLarge
          }
        };
      }

      if (screenshots.length > 0) {
        updateItems = { ...updateItems, screenshots };
      }

      featuresThumbnails?.forEach((ft) => {
        const splittedFieldname = ft.fieldname
          .replace("features[", "")
          .split("][");
        const index = Number(splittedFieldname[0]);
        updateItems.features[index].thumbnail = ft.path.replace(/\\/g, "/");
      });

      await Blog.findByIdAndUpdate(_id, updateItems, { new: true });

      res.status(httpStatus.OK).json({
        success: true,
        msg: "Blog is updated successfully."
      });
    } catch (error) {
      console.error("admin.blog.list.controller update error: ", error);
    } finally {
      next();
    }
  });
}

/**
 * Delete a blog
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
        msg: "Only authenticated administrators can delete a Blog."
      });
      return;
    }

    const { _id } = req.params;

    await Blog.findByIdAndDelete(_id);

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Blog is removed successfully."
    });
  } catch (error) {
    console.error("admin.blog.list.controller destroy error: ", error);
  } finally {
    next();
  }
}

export default {
  getById,
  getList,
  create,
  update,
  destroy
};
