import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { Faq } from "../models/faq.model";

/**
 * Get faq list
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function getList(req: Request, res: Response, next: NextFunction) {
  try {
    const faqs = await Faq.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: faqs
    });
  } catch (error) {
    console.error("faq.controller getList error: ", error);
  } finally {
    next();
  }
}

export default {
  getList
};
