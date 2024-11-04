import { TweetSchema } from '@/models/schemas/tweet'

export interface ReqGetTweetChild {
  parent_id: string
  type: number
  limit: number
  page: number
}

export interface ResTweetChild {
  tweets: TweetSchema[]
  pagination: {
    limit: number
    page: number
    total_page: number
  }
}
