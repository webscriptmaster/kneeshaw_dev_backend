import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { Faq } from "../../models/faq.model";

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
    if (!req.user) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        msg: "Only authenticated administrators can access FAQ list."
      });
      return;
    }

    const faqs = await Faq.find();

    res.status(httpStatus.OK).json({
      success: true,
      result: faqs
    });
  } catch (error) {
    console.error("admin.faq.controller getList error: ", error);
  } finally {
    next();
  }
}

/**
 * Create a faq
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function create(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        msg: "Only authenticated administrators can create a new FAQ."
      });
      return;
    }

    const { _id: creatorId } = req.user;
    const { question, answer, enabled } = req.body;

    const newFaq = new Faq({ question, answer, enabled, creatorId });
    await newFaq.save();

    res.status(httpStatus.OK).json({
      success: true,
      msg: "FAQ is created successfully."
    });
  } catch (error) {
    console.error("admin.faq.controller create error: ", error);
  } finally {
    next();
  }
}

/**
 * Update a faq
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
        msg: "Only authenticated administrators can update a FAQ."
      });
      return;
    }

    const { _id } = req.params;
    const { _id: modifierId } = req.user;
    const { question, answer, enabled } = req.body;

    await Faq.findByIdAndUpdate(
      _id,
      { question, answer, enabled, modifierId },
      { new: true }
    );

    res.status(httpStatus.OK).json({
      success: true,
      msg: "FAQ is updated successfully."
    });
  } catch (error) {
    console.error("admin.faq.controller update error: ", error);
  } finally {
    next();
  }
}

/**
 * Delete a faq
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
        msg: "Only authenticated administrators can delete a FAQ."
      });
      return;
    }

    const { _id } = req.params;

    await Faq.findByIdAndDelete(_id);

    res.status(httpStatus.OK).json({
      success: true,
      msg: "FAQ is removed successfully."
    });
  } catch (error) {
    console.error("admin.faq.controller destroy error: ", error);
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
