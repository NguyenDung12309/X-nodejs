import { Media, TweetAudience, TweetType } from '@/types/type'
import { ObjectId } from 'mongodb'

export interface ReqCreateTweet {
  content: string
  audience: TweetAudience
  parent_id: ObjectId | null
  hashtags: ObjectId[]
  mentions: ObjectId[]
  medias: Media[]
  type: TweetType
}
