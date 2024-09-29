import { objectAssign } from '@/helpers/utils'
import { ObjectId } from 'mongodb'

export class BookmarkSchema {
  _id?: ObjectId
  user_id: ObjectId
  tweet_id: ObjectId
  created_at: Date

  constructor(data: Partial<BookmarkSchema>) {
    const date = new Date()

    objectAssign(
      {
        ...data,
        created_at: data.created_at || date
      },
      this
    )
  }
}
