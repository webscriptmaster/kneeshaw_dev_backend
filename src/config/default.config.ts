import dotenv from "dotenv";

dotenv.config();

const defaultConfig = {
  app: {
    port: Number(process.env.PORT) || 5000,
    env: process.env.APP_ENV || "",
    userPortal: process.env.APP_USER_PORTAL || "",
    adminPortal: process.env.APP_ADMIN_PORTAL || ""
  },

  bcrypt: {
    salt: Number(process.env.BCRYPT_SALT) || 10
  },

  jwt: {
    access: {
      secret: process.env.JWT_ACCESS_SECRET || "",
      expiry_hour: Number(process.env.JWT_ACCESS_EXPIRY_HOUR)
    },
    refresh: {
      secret: process.env.JWT_REFRESH_SECRET || "",
      expiry_hour: Number(process.env.JWT_REFRESH_EXPIRY_HOUR)
    }
  },

  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/kneeshaw"
  },

  signup: {
    expiry_hour: Number(process.env.SIGNUP_EXPIRY_HOUR) || 12
  },

  forgot: {
    expiry_hour: Number(process.env.FORGOT_EXPIRY_HOUR) || 12
  },

  dataRequest: {
    period_day: Number(process.env.DATA_REQUEST_PERIOD_DAY) || 90
  },

  email: {
    host: process.env.EMAIL_HOST || "",
    port: Number(process.env.EMAIL_PORT) || 0,
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASS || "",
    from: process.env.EMAIL_FROM || ""
  },

  twilio: {
    accountSID: process.env.TWILIO_ACCOUNT_SID || "",
    authToken: process.env.TWILIO_AUTH_TOKEN || "",
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || ""
  },

  stripe: {
    public_key: process.env.STRIPE_PUBLIC_KEY || "",
    secret_key: process.env.STRIPE_SECRET_KEY || ""
  },

  openai: {
    organization: process.env.OPENAI_ORGANIZATION || "",
    api_key: process.env.OPENAI_API_KEY || ""
  }
};

export default defaultConfig;
