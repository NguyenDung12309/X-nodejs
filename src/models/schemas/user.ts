import { objectAssign } from '@/helpers/utils.js'
import { ObjectId } from 'mongodb'

export class UserSchema {
  _id?: ObjectId
  name: string
  email: string
  date_of_birth: Date
  password: string
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string
  forgot_password_token?: string
  verify?: UserVerifyStatus
  bio?: string
  location?: string
  website?: string
  username?: string
  avatar?: string
  cover_photo?: string

  constructor(data: Partial<UserSchema>) {
    const date = new Date()

    objectAssign(
      {
        ...data,
        created_at: data.created_at || date,
        updated_at: data.updated_at || date,
        verify: data.verify || UserVerifyStatus.unverified
      },
      this
    )
  }
}

enum UserVerifyStatus {
  unverified,
  verified,
  banned
}
