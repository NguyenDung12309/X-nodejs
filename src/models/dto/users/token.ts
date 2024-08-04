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

export interface reqResendMailToken {
  authorization: string
}

export interface resRessendMailToken {
  email_verify_token: string
}
