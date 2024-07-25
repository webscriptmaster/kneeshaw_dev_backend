import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { verify } from "jsonwebtoken";

import { IUser, User } from "../../models/user.model";
import defaultConfig from "../../config/default.config";
import { RefreshToken } from "../../models/refresh-token.model";

/**
 * Login
 *
 * @param req
 * @param res
 * @param _next
 */
async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  try {
    const user: IUser = await User.findOne({ email }).select("+password");

    if (user && user.comparePassword(password)) {
      if (!user.isActive) {
        res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          msg: "Please check your email to verify the account"
        });
        return;
      }

      await RefreshToken.deleteMany({
        userId: user._id
      });

      const expiry = new Date();
      expiry.setHours(
        expiry.getHours() + defaultConfig.jwt.refresh.expiry_hour
      );
      const refreshToken = new RefreshToken({
        userId: user._id,
        token: user.generateRefreshToken(),
        expiry
      });
      await refreshToken.save();

      res.status(httpStatus.OK).json({
        user,
        accessToken: user.generateAccessToken(),
        refreshToken: refreshToken.token,
        msg: "You logged in successfully."
      });
    } else {
      res
        .status(httpStatus.UNAUTHORIZED)
        .json({ success: false, msg: "Authentication failed." });
    }
  } catch (error) {
    console.error("admin.auth.controller login error: ", error);
  } finally {
    next();
  }
}

/**
 * logout
 *
 * @param req
 * @param res
 * @param next
 */
async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    await RefreshToken.deleteMany({
      userId: req.user?._id
    });

    res.status(httpStatus.OK).json({
      success: true,
      msg: "You logged out successfully."
    });
  } catch (error) {
    console.error("admin.auth.controller logout error: ", error);
  } finally {
    next();
  }
}

/**
 * refresh token
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function regenerateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { refreshToken } = req.body;

  try {
    const token = await RefreshToken.findOne({ token: refreshToken });

    if (!token) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Refresh token not found."
      });
      return;
    }

    if (token && token.expiry < new Date()) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Refresh token is expired."
      });
      return;
    }

    let decodedUser = verify(refreshToken, defaultConfig.jwt.refresh.secret);
    decodedUser = decodedUser as IUser;

    if (decodedUser._id !== token.userId) {
      await RefreshToken.deleteOne({ token: refreshToken });
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Refresh token is invalid."
      });
      return;
    }

    const user: IUser | null = await User.findOne({ userId: decodedUser._id });
    if (!user) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "User doesn't exist."
      });
      return;
    }

    await RefreshToken.deleteMany({ userId: decodedUser._id });

    const expiry = new Date();
    expiry.setHours(expiry.getHours() + defaultConfig.jwt.refresh.expiry_hour);
    const newRefreshToken = new RefreshToken({
      userId: decodedUser._id,
      token: user.generateRefreshToken(),
      expiry
    });
    await newRefreshToken.save();

    res.status(httpStatus.OK).json({
      success: true,
      accessToken: user.generateAccessToken(),
      refreshToken: newRefreshToken.token
    });
  } catch (error) {
    console.error("admin.auth.controller regenerateToken error: ", error);
  } finally {
    next();
  }
}

export default {
  login,
  logout,
  regenerateToken
};
