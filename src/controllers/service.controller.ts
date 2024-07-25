import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { Service } from "../models/service.model";

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
    const services = await Service.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: services
    });
  } catch (error) {
    console.error("service.controller getList error: ", error);
  } finally {
    next();
  }
}

export default {
  getList
};
