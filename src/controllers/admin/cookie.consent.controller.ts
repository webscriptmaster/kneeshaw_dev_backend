import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import defaultConfig from "../../config/default.config";
import { CookieConsent } from "../../models/cookie-consent.model";

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
    if (!req.user) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        msg: "Only authenticated administrators can access Cookie Consent."
      });
      return;
    }

    let consent = await CookieConsent.findOne();

    if (!consent) {
      const { _id: creatorId } = req.user;

      const newConsent = new CookieConsent({
        description: `We use essential cookies to make our site work. With your consent, we may also use non-essential cookies to improve user experience and analyze website traffic. By clicking "Accept", you agree to our website's cookie use as described in our <a className="text-[#AFD275]" href="${defaultConfig.app.userPortal}/cookie" target="_blank">Cookie</a>.`,
        acceptLabel: "Accept",
        declineLabel: "Decline",
        position: "bottom",
        creatorId
      });
      await newConsent.save();

      consent = await CookieConsent.findOne();
    }

    res.status(httpStatus.OK).json({
      success: true,
      result: consent
    });
  } catch (error) {
    console.error("admin.cookie.consent.controller get error: ", error);
  } finally {
    next();
  }
}

/**
 * Update a cookie consent
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
        msg: "Only authenticated administrators can update a Cookie Consent."
      });
      return;
    }

    const { _id: modifierId } = req.user;
    const { description, acceptLabel, declineLabel, position } = req.body;

    await CookieConsent.findOneAndUpdate(
      {},
      { description, acceptLabel, declineLabel, position, modifierId },
      { new: true }
    );

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Cookie Consent is updated successfully."
    });
  } catch (error) {
    console.error("admin.cookie.consent.controller update error: ", error);
  } finally {
    next();
  }
}

export default {
  get,
  update
};
