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
