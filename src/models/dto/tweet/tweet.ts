import { Media, TweetAudience } from '@/types/type'
import { ObjectId } from 'mongodb'

export interface ReqTweet {
  content: string
  audience: TweetAudience
  parent_id: ObjectId | null
  hashtags: ObjectId[]
  mentions: ObjectId[]
  medias: Media[]
}
