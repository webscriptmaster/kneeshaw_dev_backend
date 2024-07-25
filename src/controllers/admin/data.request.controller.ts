import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { DataRequest } from "../../models/data-request.model";

/**
 * Get data request history
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
        msg: "Only authenticated administrators can access Data Request list."
      });
      return;
    }

    const requests = await DataRequest.find()
      .populate("creator")
      .sort({ createdAt: "desc" });

    res.status(httpStatus.OK).json({
      success: true,
      result: requests
    });
  } catch (error) {
    console.error("admin.data.request.controller getList error: ", error);
  } finally {
    next();
  }
}

/**
 * Delete a data request
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
        msg: "Only authenticated administrators can delete a Data Request."
      });
      return;
    }

    const { _id } = req.params;

    await DataRequest.findByIdAndDelete(_id);

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Data Request is removed successfully."
    });
  } catch (error) {
    console.error("admin.data.request.controller destroy error: ", error);
  } finally {
    next();
  }
}

export default {
  getList,
  destroy
};
