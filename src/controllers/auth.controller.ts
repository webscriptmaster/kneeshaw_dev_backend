import { genSaltSync, hashSync } from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { verify } from "jsonwebtoken";
import { customAlphabet, nanoid } from "nanoid";

import { IUser, User } from "../models/user.model";
import { IRegisterToken, RegisterToken } from "../models/register-token.model";
import { APP_ENV, SITE_TITLE } from "../utils/const.util";
import defaultConfig from "../config/default.config";
import { sendEmail } from "../services/email.service";
import { RefreshToken } from "../models/refresh-token.model";
import { IResetToken, ResetToken } from "../models/reset-token.model";
import { sendSMS } from "../services/sms.service";
import upload from "../services/upload.service";
import { DataRequest } from "../models/data-request.model";

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

      const lastDataRequest = await DataRequest.findOne({
        creator: user._id
      }).sort({
        createdAt: "desc"
      });

      let canDataRequest = true;
      if (lastDataRequest && lastDataRequest.availableAt > new Date()) {
        canDataRequest = false;
      }

      res.status(httpStatus.OK).json({
        user,
        lastDataRequest,
        canDataRequest,
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
    console.error("auth.controller login error: ", error);
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
    console.error("auth.controller logout error: ", error);
  } finally {
    next();
  }
}

/**
 * Register a user
 *
 * @param req
 * @param res
 * @param _next
 */
async function register(req: Request, res: Response, next: NextFunction) {
  const { role, firstName, lastName, email, phone, username, password } =
    req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (!existingUser.isActive) {
        await RegisterToken.deleteMany({ userId: existingUser._id });
        await User.deleteOne({ email, isActive: false });
      } else {
        res.status(httpStatus.CONFLICT).json({
          success: false,
          msg: "Email is already in use."
        });
        return;
      }
    }

    const user = new User({
      role,
      firstName,
      lastName,
      email,
      phone,
      username,
      password,
      isActive: false
    });

    await user.save();

    const token = nanoid();
    const code = customAlphabet("0123456789", 4)();
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + defaultConfig.signup.expiry_hour);

    const registerToken = new RegisterToken({
      token,
      userId: user._id,
      code,
      expiry,
      accepted: false
    });
    await registerToken.save();

    if (defaultConfig.app.env === APP_ENV.PRODUCTION) {
      await sendEmail({
        to: email,
        subject: `Welcome to ${SITE_TITLE}`,
        text: `Hi. Welcome to ${SITE_TITLE}. To complete your sign-up, please click following link. ${defaultConfig.app.userPortal}/verify/${token}`,
        html: `Hi. Welcome to ${SITE_TITLE}. To complete your sign-up, please click following link. ${defaultConfig.app.userPortal}/verify/${token}`
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      msg: "You have been successfully registered."
    });
  } catch (error) {
    console.error("auth.controller register error: ", error);
  } finally {
    next();
  }
}

/**
 * verify register token
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function verifyRegisterToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.body;

  try {
    const registerToken: IRegisterToken | null = await RegisterToken.findOne({
      token
    });

    if (!registerToken) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Token not found."
      });
      return;
    }

    if (registerToken.expiry < new Date()) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Token is expired."
      });
      return;
    }

    if (registerToken.accepted) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Token is already accepted."
      });
      return;
    }

    await RegisterToken.findOneAndUpdate(
      { token },
      { accepted: true },
      { new: true }
    );

    await User.findOneAndUpdate(
      { _id: registerToken.userId },
      { isActive: true },
      { new: true }
    );

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Your account has been successfully verified."
    });
  } catch (error) {
    console.error("auth.controller verifyRegisterToken error: ", error);
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
    console.error("auth.controller regenerateToken error: ", error);
  } finally {
    next();
  }
}

/**
 * send reset link via email
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function sendResetLink(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email, isActive: true });

    if (!user) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "User doesn't exist."
      });
      return;
    }

    await ResetToken.deleteMany({ userId: user._id });

    const token = nanoid();
    const code = customAlphabet("0123456789", 4)();
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + defaultConfig.forgot.expiry_hour);

    const resetToken = new ResetToken({
      token,
      userId: user._id,
      code,
      expiry,
      accepted: false
    });

    await resetToken.save();

    if (defaultConfig.app.env === APP_ENV.PRODUCTION) {
      await sendEmail({
        to: email,
        subject: `Welcome to ${SITE_TITLE}`,
        text: `Hi. Welcome to ${SITE_TITLE}. To reset your password, please click following link. ${defaultConfig.app.userPortal}/reset/${token}`,
        html: `Hi. Welcome to ${SITE_TITLE}. To reset your password, please click following link. ${defaultConfig.app.userPortal}/reset/${token}`
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Password reset link has been successfully sent."
    });
  } catch (error) {
    console.error("auth.controller sendResetLink error: ", error);
  } finally {
    next();
  }
}

/**
 * verify reset token
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function verifyResetToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token } = req.body;

  try {
    const resetToken: IResetToken | null = await ResetToken.findOne({
      token
    });

    if (!resetToken) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Token not found."
      });
      return;
    }

    if (resetToken.expiry < new Date()) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Token is expired."
      });
      return;
    }

    if (resetToken.accepted) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Token is already used."
      });
      return;
    }

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Please reset your password."
    });
  } catch (error) {
    console.error("auth.controller verifyResetToken error: ", error);
  } finally {
    next();
  }
}

/**
 * reset password by token
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function resetPasswordByToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token, password } = req.body;

  try {
    const resetToken = await ResetToken.findOne({ token });
    if (!resetToken) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Token not found."
      });
      return;
    }

    if (resetToken.expiry < new Date()) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Token is expired."
      });
      return;
    }

    if (resetToken.accepted) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Token already accepted."
      });
      return;
    }

    const user = await User.findOne({ _id: resetToken.userId });
    if (!user) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "User not found."
      });
      return;
    }

    const salt = genSaltSync(defaultConfig.bcrypt.salt);
    const hashedPassword = hashSync(password, salt);

    await ResetToken.findOneAndUpdate(
      { token },
      { accepted: true },
      { new: true }
    );

    await User.findOneAndUpdate(
      { _id: resetToken.userId },
      { password: hashedPassword },
      { new: true }
    );

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Your password has been successfully reset."
    });
  } catch (error) {
    console.error("auth.controller resetPasswordByToken error: ", error);
  } finally {
    next();
  }
}

/**
 * send reset code via phone
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function sendResetCode(req: Request, res: Response, next: NextFunction) {
  const { phone } = req.body;

  try {
    const user = await User.findOne({ phone, isActive: true });

    if (!user) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "User doesn't exist."
      });
      return;
    }

    await ResetToken.deleteMany({ userId: user._id });

    const token = nanoid();
    const code = customAlphabet("0123456789", 4)();
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + defaultConfig.forgot.expiry_hour);

    const resetToken = new ResetToken({
      token,
      userId: user._id,
      code,
      expiry,
      accepted: false
    });

    await resetToken.save();

    if (defaultConfig.app.env === APP_ENV.PRODUCTION) {
      await sendSMS({
        to: `+${phone}`,
        body: `Your ${SITE_TITLE} verification code is: ${code}`
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Verification code for reset password has been sent via your phone."
    });
  } catch (error) {
    console.error("auth.controller sendResetCode error: ", error);
  } finally {
    next();
  }
}

/**
 * verify reset code
 *
 * @param req
 * @param res
 * @param _next
 * @returns
 */
async function verifyResetCode(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { phone, code } = req.body;

  try {
    const user = await User.findOne({ phone, isActive: true });

    const resetToken = await ResetToken.findOne({
      userId: user?._id
    });

    if (!resetToken) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Verification code not found."
      });
      return;
    }

    if (resetToken.expiry < new Date()) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Verification code is expired."
      });
      return;
    }

    if (resetToken.accepted) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Verification code is already used."
      });
      return;
    }

    if (resetToken.code !== code) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Verification code is incorrect."
      });
      return;
    }

    res.status(httpStatus.OK).json({
      success: true,
      msg: "You have been successfully verified.",
      token: resetToken.token
    });
  } catch (error) {
    console.error("auth.controller verifyResetCode error: ", error);
  } finally {
    next();
  }
}

/**
 * Update profile
 *
 * @param req
 * @param res
 * @param next
 */
async function updateProfile(req: Request, res: Response, next: NextFunction) {
  upload("users").any()(req, res, async (err) => {
    if (err) {
      res.status(httpStatus.NOT_ACCEPTABLE).json({
        success: false,
        msg: "Something went wrong while uploading avatar",
        code: err.code
      });
      return;
    }

    try {
      if (!req.user) {
        res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          msg: "Only authenticated user can update the profile."
        });
        return;
      }

      const { _id: modifierId } = req.user;
      const { firstName, lastName } = req.body;
      let updateItems: Record<string, any> = {
        firstName,
        lastName,
        modifierId
      };

      let avatar = null;
      if (Array.isArray(req.files) && req.files.length > 0) {
        avatar = req.files[0].path.replace(/\\/g, "/");
      }

      if (avatar) {
        updateItems = { ...updateItems, avatar };
      }

      const user = await User.findByIdAndUpdate(req.user._id, updateItems, {
        new: true
      });

      res.status(httpStatus.OK).json({
        success: true,
        msg: "Profile is updated successfully.",
        user
      });
    } catch (error) {
      console.error("auth.controller updateProfile error: ", error);
    } finally {
      next();
    }
  });
}

/**
 * Change email
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function changeEmail(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      return;
    }

    const { _id: userId } = req.user;
    const { email } = req.body;

    const existingUser = await User.findOne({ email, _id: { $ne: userId } });

    if (existingUser) {
      res.status(httpStatus.CONFLICT).json({
        success: false,
        msg: "Email is already in use."
      });
      return;
    }

    const user = await User.findByIdAndUpdate(userId, { email }, { new: true });

    res.status(httpStatus.OK).json({
      success: true,
      user,
      msg: "Email changed successfully."
    });
  } catch (error) {
    console.error("auth.controller changeEmail error: ", error);
  } finally {
    next();
  }
}

/**
 * Change password
 *
 * @param req
 * @param res
 * @param _next
 */
async function changePassword(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      return;
    }

    const { _id: userId } = req.user;
    const { current, password } = req.body;

    const user: IUser | null = await User.findById(userId);

    if (!user) return;

    if (!user.comparePassword(current)) {
      res
        .status(httpStatus.NOT_ACCEPTABLE)
        .json({ success: false, msg: "Current password is wrong." });
      return;
    }

    const salt = genSaltSync(defaultConfig.bcrypt.salt);
    const hashedPassword = hashSync(password, salt);

    await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    res.status(httpStatus.OK).json({
      success: true,
      msg: "Password successfully changed."
    });
  } catch (error) {
    console.error("auth.controller changePassword error: ", error);
  } finally {
    next();
  }
}

/**
 * Send Data Request
 *
 * @param req
 * @param res
 * @param _next
 */
async function sendDataRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      return;
    }

    const { _id: userId } = req.user;

    const user = await User.findById(userId).select(
      "-_id firstName lastName email phone userName"
    );

    const availableAt = new Date();
    availableAt.setDate(
      availableAt.getDate() + defaultConfig.dataRequest.period_day
    );

    const dataRequest = new DataRequest({
      data: JSON.stringify(user),
      availableAt,
      creator: req.user
    });
    await dataRequest.save();

    if (defaultConfig.app.env === APP_ENV.PRODUCTION) {
      await sendEmail({
        to: user?.email ?? "",
        subject: `${SITE_TITLE} - Data Request`,
        text: `You've requested a copy of your data. You can request again ${availableAt}. Data: ${JSON.stringify(
          user
        )}`,
        html: `You've requested a copy of your data. You can request again ${availableAt}. Data: ${JSON.stringify(
          user
        )}`
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      lastDataRequest: dataRequest,
      canDataRequest: false,
      msg: "Data successfully requested."
    });
  } catch (error) {
    console.error("auth.controller sendDataRequest error: ", error);
  } finally {
    next();
  }
}

export default {
  login,
  logout,

  register,
  verifyRegisterToken,

  regenerateToken,

  sendResetLink,
  verifyResetToken,
  resetPasswordByToken,

  sendResetCode,
  verifyResetCode,

  updateProfile,
  changeEmail,
  changePassword,

  sendDataRequest
};
