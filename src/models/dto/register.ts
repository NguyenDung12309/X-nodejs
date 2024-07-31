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
