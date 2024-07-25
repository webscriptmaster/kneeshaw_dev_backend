import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Document, model, Model, Schema } from "mongoose";

import defaultConfig from "../config/default.config";

interface IUser {
  _id?: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  isActive: boolean;
  avatar?: string;
  memo?: string;

  comparePassword(password: string): boolean;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

interface UserDocument extends Document {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  isActive: boolean;
  avatar?: string;
  memo?: string;
}

const UserSchema: Schema = new Schema(
  {
    role: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      required: true
    },
    avatar: {
      type: String,
      required: false
    },
    memo: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true,
    collection: "user"
  }
);

UserSchema.pre<UserDocument>(
  "save",
  function preSave(this: UserDocument, next) {
    if (!this.isModified("password")) {
      next();
    }

    const salt = genSaltSync(defaultConfig.bcrypt.salt);
    this.password = hashSync(this.password, salt);
    next();
  }
);

UserSchema.methods.comparePassword = function comparePassword(
  password: string
) {
  return compareSync(password, this.password);
};

UserSchema.methods.generateAccessToken = function generateAccessToken() {
  const accessToken = sign(
    {
      _id: this._id,
      role: this.role,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      username: this.username,
      isActive: this.isActive
    },
    defaultConfig.jwt.access.secret,
    {
      expiresIn: `${defaultConfig.jwt.access.expiry_hour}h`
    }
  );

  return accessToken;
};

UserSchema.methods.generateRefreshToken = function generateRefreshToken() {
  const refreshToken = sign(
    {
      _id: this._id,
      role: this.role,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      username: this.username,
      isActive: this.isActive
    },
    defaultConfig.jwt.refresh.secret,
    {
      expiresIn: `${defaultConfig.jwt.refresh.expiry_hour}h`
    }
  );

  return refreshToken;
};

const User: Model<UserDocument> = model<UserDocument>("User", UserSchema);

export { IUser, UserDocument, User };
