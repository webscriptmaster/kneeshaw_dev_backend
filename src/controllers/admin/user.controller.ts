import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import upload from "../../services/upload.service";
import { User } from "../../models/user.model";

/**
 * Get a user
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
        msg: "Only authenticated administrators can access a User."
      });
      return;
    }

    const { _id } = req.params;

    const result = await User.findById(_id);

    res.status(httpStatus.OK).json({
      success: true,
      result
    });
  } catch (error) {
    console.error("admin.user.controller getById error: ", error);
  } finally {
    next();
  }
}

/**
 * Get user list
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
        msg: "Only authenticated administrators can access User list."
      });
      return;
    }

    const users = await User.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: users
    });
  } catch (error) {
    console.error("admin.user.controller getList error: ", error);
  } finally {
    next();
  }
}

/**
 * Update a user
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function update(req: Request, res: Response, next: NextFunction) {
  upload("users").any()(req, res, async (err) => {
    if (err) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Something went wrong while uploading avatar",
        code: err.code
      });
      return;
    }

    try {
      if (!req.user) {
        res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          msg: "Only authenticated administrators can update a User."
        });
        return;
      }

      const { _id } = req.params;
      const { _id: modifierId } = req.user;
      const {
        role,
        firstName,
        lastName,
        email,
        phone,
        username,
        isActive,
        memo
      } = req.body;
      let updateItems: Record<string, any> = {
        role,
        firstName,
        lastName,
        email,
        phone,
        username,
        isActive,
        memo,
        modifierId
      };

      let avatar = null;
      if (Array.isArray(req.files) && req.files.length > 0) {
        avatar = req.files[0].path.replace(/\\/g, "/");
      }

      if (avatar) {
        updateItems = { ...updateItems, avatar };
      }

      await User.findByIdAndUpdate(_id, updateItems, { new: true });

      res.status(httpStatus.OK).json({
        success: true,
        msg: "User is updated successfully."
      });
    } catch (error) {
      console.error("admin.user.controller update error: ", error);
    } finally {
      next();
    }
  });
}

/**
 * Delete a user
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
        msg: "Only authenticated administrators can delete a User."
      });
      return;
    }

    const { _id } = req.params;

    await User.findByIdAndDelete(_id);

    res.status(httpStatus.OK).json({
      success: true,
      msg: "User is removed successfully."
    });
  } catch (error) {
    console.error("admin.user.controller destroy error: ", error);
  } finally {
    next();
  }
}

export default {
  getById,
  getList,
  update,
  destroy
};
