import { objectAssign } from '@/helpers/utils'
import { ObjectId } from 'mongodb'

export class FollowSchema {
  _id?: ObjectId
  user_id: ObjectId
  followed_user_id: ObjectId
  created_at: Date

  constructor(data: Partial<FollowSchema>) {
    objectAssign(
      {
        ...data,
        created_at: data.created_at || new Date()
      },
      this
    )
  }
}
