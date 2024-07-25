import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { Cart, ICart } from "../models/cart.model";
import { CART_STATUS } from "../utils/const.util";

/**
 * Get a cart item by id
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const { _id } = req.params;

    const result: ICart | null = await Cart.findById(_id).populate("game");

    res.status(httpStatus.OK).json({
      success: true,
      result
    });
  } catch (error) {
    console.error("cart.controller getById error: ", error);
  } finally {
    next();
  }
}

/**
 * Get cart items
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
        msg: "Only authenticated user can get Cart items."
      });
      return;
    }

    const { _id: purchaserId } = req.user;

    const cartItems = await Cart.find({ purchaser: purchaserId }).populate(
      "game"
    );

    res.status(httpStatus.OK).json({
      success: true,
      result: cartItems
    });
  } catch (error) {
    console.error("cart.controller getList error: ", error);
  } finally {
    next();
  }
}

/**
 * Add item to cart
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
        msg: "Only authenticated user can add to Cart."
      });
      return;
    }

    const purchaser = req?.user?._id;
    const { game, quantity, amount } = req.body;

    await Cart.deleteMany({
      purchaser,
      game,
      status: CART_STATUS.IN_CART
    });

    const newCart = new Cart({
      purchaser,
      game,
      quantity,
      amount,
      status: CART_STATUS.IN_CART
    });
    await newCart.save();

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Item is added to cart successfully."
    });
  } catch (error) {
    console.error("cart.controller create error: ", error);
  } finally {
    next();
  }
}

export default {
  getById,
  getList,
  create
};
