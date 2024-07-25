import { genSaltSync, hashSync } from "bcryptjs";

import { USER_ROLES } from "../utils/const.util";
import { User } from "../models/user.model";
import defaultConfig from "../config/default.config";

export default async function seedUsers() {
  const salt = genSaltSync(defaultConfig.bcrypt.salt);

  await User.deleteMany({});

  const adminUsers = [
    {
      role: USER_ROLES.ADMIN,
      firstName: "Michael",
      lastName: "Kneeshaw",
      email: "michael@kneeshaw.dev",
      phone: "+16169302136",
      username: "Michael Kneeshaw",
      password: hashSync("1qazxsw2", salt),
      isActive: true,
      avatar: null,
      memo: "Owner"
    },
    {
      role: USER_ROLES.ADMIN,
      firstName: "Steven",
      lastName: "Universe",
      email: "truthfuldev@gmail.com",
      phone: "+381628678966",
      username: "Steven Universe",
      password: hashSync("1qazxsw2", salt),
      isActive: true,
      avatar: null,
      memo: "Admin"
    }
  ];

  await User.insertMany(adminUsers);
}
