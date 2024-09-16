import { objectAssign } from '@/helpers/utils'
import { UserVerifyStatus } from '@/types/type'
import { ObjectId } from 'mongodb'

export class RefreshTokenSchema {
  _id?: ObjectId
  token: string
  created_at?: Date
  verify: UserVerifyStatus
  user_id: ObjectId
  iat: Date | number
  exp: Date | number

  constructor(data: Partial<RefreshTokenSchema>) {
    objectAssign(
      {
        ...data,
        created_at: data.created_at || new Date(),
        iat: typeof data.iat === 'number' ? new Date(data.iat * 1000) : data.iat,
        exp: typeof data.exp === 'number' ? new Date(data.exp * 1000) : data.exp
      },
      this
    )
  }
}
