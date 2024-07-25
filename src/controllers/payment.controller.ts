import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import Stripe from "stripe";

import defaultConfig from "../config/default.config";

/**
 * Checkout by stripe
 *
 * @param req
 * @param res
 * @param next
 */
async function checkout(req: Request, res: Response, next: NextFunction) {
  try {
    const stripe = new Stripe(defaultConfig.stripe.secret_key);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
              // Optionally, provide an image for the product
              images: ["https://example.com/t-shirt.png"]
            },
            unit_amount: 2000 // Price in cents: $20.00
          },
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel"
    });

    res.status(httpStatus.OK).json({
      success: true,
      sessionId: session.id
    });
  } catch (error) {
    console.error("payment.controller checkout error: ", error);
  } finally {
    next();
  }
}

export default {
  checkout
};
