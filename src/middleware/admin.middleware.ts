import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { verify } from "jsonwebtoken";

import { ADMIN_AUTHORIZATION_PREFIX, USER_ROLES } from "../utils/const.util";
import defaultConfig from "../config/default.config";
import { IUser } from "../models/user.model";

export default async function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === ADMIN_AUTHORIZATION_PREFIX
    ) {
      const decodedUser = verify(
        req.headers.authorization.split(" ")[1],
        defaultConfig.jwt.access.secret
      ) as IUser;

      if (
        decodedUser &&
        decodedUser.role === USER_ROLES.ADMIN &&
        decodedUser.isActive
      ) {
        req.user = decodedUser;
        next();
      } else {
        req.user = undefined;
        res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: "Unauthorized administrator!" });
      }
    } else {
      req.user = undefined;
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Unauthorized administrator!" });
    }
  } catch (error) {
    console.error("adminMiddleware error: ", error);
    res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Unauthorized administrator!" });
  }
}
