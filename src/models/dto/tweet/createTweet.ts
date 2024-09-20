import { Media, TweetAudience, TweetType } from '@/types/type'

export interface ReqCreateTweet {
  content: string
  audience: TweetAudience
  parent_id: string | null
  hashtags: string[]
  mentions: string[]
  medias: Media[]
  type: TweetType
}
