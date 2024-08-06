import { objectAssign } from '@/helpers/utils'
import { UserVerifyStatus } from '@/types/type'
import { ObjectId } from 'mongodb'

export class RefreshTokenSchema {
  _id?: ObjectId
  token: string
  created_at?: Date
  verify: UserVerifyStatus
  user_id: ObjectId

  constructor(data: Partial<RefreshTokenSchema>) {
    objectAssign(
      {
        ...data,
        created_at: data.created_at || new Date()
      },
      this
    )
  }
}
