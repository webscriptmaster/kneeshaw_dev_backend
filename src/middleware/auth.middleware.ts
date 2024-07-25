import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { verify } from "jsonwebtoken";

import defaultConfig from "../config/default.config";
import { IUser } from "../models/user.model";
import { AUTHORIZATION_PREFIX } from "../utils/const.util";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === AUTHORIZATION_PREFIX
    ) {
      const decodedUser = verify(
        req.headers.authorization.split(" ")[1],
        defaultConfig.jwt.access.secret
      ) as IUser;

      if (decodedUser && decodedUser.isActive) {
        req.user = decodedUser;
        next();
      } else {
        req.user = undefined;
        res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: "Unauthorized user!" });
      }
    } else {
      req.user = undefined;
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Unauthorized user!" });
    }
  } catch (error) {
    console.error("authMiddleware error: ", error);
    res.status(httpStatus.UNAUTHORIZED).json({ message: "Unauthorized user!" });
  }
}
