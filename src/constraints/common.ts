import 'dotenv/config'

export const ENV_CONST = {
  accessKey: process.env.ACCESS_TOKEN_SECRET_KEY,
  refreshKey: process.env.REFRESH_TOKEN_SECRET_KEY,
  verifyEmailKey: process.env.VERIFY_EMAIL_TOKEN_SECRET_KEY,
  forgotPasswordKey: process.env.FORGOT_PASSWORD_TOKEN_SECRET_KEY
}

export const port = 3000
