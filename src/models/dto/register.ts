export interface reqRegister {
  email: string
  password: string
  name: string
  confirm_password: string
  date_of_birth: string
}

export interface reqLogin {
  email: string
  password: string
}

export interface resToken {
  access_token: string
  refresh_token: string
}

export interface reqLogout {
  refresh_token: string
}
