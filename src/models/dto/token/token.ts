export interface reqRefreshToken {
  refresh_token: string
}

export interface resAuthToken {
  access_token: string
  refresh_token: string
}

export interface reqVerifyEmailToken {
  email_verify_token: string
}

export interface resVerifyMailToken {
  email_verify_token: string
}

export interface reqAuthorization {
  authorization: string
}

export interface reqForgotPasswordToken {
  forgot_password_token: string
}

export interface resForgotPasswordToken {
  forgot_password_token: string
}
