import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { CookieConsent } from "../models/cookie-consent.model";

/**
 * Get cookie consent
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const consent = await CookieConsent.findOne();

    res.status(httpStatus.OK).json({
      success: true,
      result: consent
    });
  } catch (error) {
    console.error("cookie.consent.controller get error: ", error);
  } finally {
    next();
  }
}

export default {
  get
};
