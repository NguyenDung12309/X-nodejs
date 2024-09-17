export interface ReqRefreshToken {
  refresh_token: string
}

export interface ResAuthToken {
  access_token: string
  refresh_token: string
}

export interface ReqVerifyEmailToken {
  email_verify_token: string
}

export interface ResVerifyMailToken {
  email_verify_token: string
}

export interface ReqAuthorization {
  authorization: string
}

export interface ReqForgotPasswordToken {
  forgot_password_token: string
}

export interface ResForgotPasswordToken {
  forgot_password_token: string
}
