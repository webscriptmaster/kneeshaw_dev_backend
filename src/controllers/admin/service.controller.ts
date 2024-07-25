import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { Service } from "../../models/service.model";
import upload from "../../services/upload.service";

/**
 * Get service list
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
        msg: "Only authenticated administrators can access Service list."
      });
      return;
    }

    const services = await Service.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: services
    });
  } catch (error) {
    console.error("admin.service.controller getList error: ", error);
  } finally {
    next();
  }
}

/**
 * Create a service
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function create(req: Request, res: Response, next: NextFunction) {
  upload("services").any()(req, res, async (err) => {
    if (err) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Something went wrong while uploading thumbnail",
        code: err.code
      });
      return;
    }

    try {
      if (!req.user) {
        res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          msg: "Only authenticated administrators can create a new Service."
        });
        return;
      }

      const { _id: creatorId } = req.user;
      const { title, description, enabled } = req.body;

      let thumbnail = null;
      if (Array.isArray(req.files) && req.files.length > 0) {
        thumbnail = req.files[0].path.replace(/\\/g, "/");
      }

      const newService = new Service({
        thumbnail,
        title,
        description,
        enabled,
        creatorId
      });
      await newService.save();

      res.status(httpStatus.OK).json({
        success: true,
        msg: "Service is created successfully."
      });
    } catch (error) {
      console.error("admin.service.controller create error: ", error);
    } finally {
      next();
    }
  });
}

/**
 * Update a service
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function update(req: Request, res: Response, next: NextFunction) {
  upload("services").any()(req, res, async (err) => {
    if (err) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Something went wrong while uploading thumbnail",
        code: err.code
      });
      return;
    }

    try {
      if (!req.user) {
        res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          msg: "Only authenticated administrators can update a Service."
        });
        return;
      }

      const { _id } = req.params;
      const { _id: modifierId } = req.user;
      const { title, description, enabled } = req.body;
      let updateItems: Record<string, any> = {
        title,
        description,
        enabled,
        modifierId
      };

      let thumbnail = null;
      if (Array.isArray(req.files) && req.files.length > 0) {
        thumbnail = req.files[0].path.replace(/\\/g, "/");
      }

      if (thumbnail) {
        updateItems = { ...updateItems, thumbnail };
      }

      await Service.findByIdAndUpdate(_id, updateItems, { new: true });

      res.status(httpStatus.OK).json({
        success: true,
        msg: "Service is updated successfully."
      });
    } catch (error) {
      console.error("admin.service.controller update error: ", error);
    } finally {
      next();
    }
  });
}

/**
 * Delete a service
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
        msg: "Only authenticated administrators can delete a Service."
      });
      return;
    }

    const { _id } = req.params;

    await Service.findByIdAndDelete(_id);

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Service is removed successfully."
    });
  } catch (error) {
    console.error("admin.service.controller destroy error: ", error);
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
