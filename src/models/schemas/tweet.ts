import { ObjectId } from 'mongodb'
import { Media, TweetAudience, TweetType } from '@/types/type'
import { objectAssign } from '@/helpers/utils'

export class Tweet {
  _id?: ObjectId
  user_id: ObjectId
  content: string
  audience: TweetAudience
  parent_id: ObjectId | null
  hashtags: ObjectId[]
  mentions: ObjectId[]
  medias: Media[]
  type: TweetType
  guest_views: number
  user_views: number
  created_at?: Date
  updated_at?: Date

  constructor(data: Partial<Tweet>) {
    const date = new Date()

    objectAssign(
      {
        ...data,
        created_at: data.created_at || date,
        updated_at: data.updated_at || date
      },
      this
    )
  }
}
