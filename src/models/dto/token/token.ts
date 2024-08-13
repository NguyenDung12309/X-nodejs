export interface reqAccessToken {
  refresh_token: string
}

export interface resToken {
  access_token: string
  refresh_token: string
}

export interface reqVerifyEmail {
  email_verify_token: string
}

export interface reqAuthorization {
  authorization: string
}

export interface resRessendMailToken {
  email_verify_token: string
}

export interface reqVerifyForgotPasswordToken {
  forgot_password_token: string
}
