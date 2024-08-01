import { objectAssign } from '@/helpers/utils'
import { ObjectId } from 'mongodb'

export class RefreshTokenSchema {
  _id: ObjectId
  token: string
  created_at: Date
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
