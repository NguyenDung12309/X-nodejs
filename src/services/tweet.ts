import { ReqCreateTweet } from '@/models/dto/tweet/createTweet'
import { databaseService } from './db'
import { TweetSchema } from '@/models/schemas/tweet'
import { ObjectId } from 'mongodb'

class TweetService {
  createTweet = (data: ReqCreateTweet) => {
    const { hashtags, parent_id, mentions, ...rest } = data
    const convertHashtags = hashtags.map((tag) => new ObjectId(tag))
    const convertParentId = parent_id ? new ObjectId(parent_id) : null
    const convertMentions = mentions.map((mention) => new ObjectId(mention))

    databaseService.tweet.insertOne(
      new TweetSchema({
        ...rest,
        hashtags: convertHashtags,
        parent_id: convertParentId,
        mentions: convertMentions
      })
    )
  }
}

export const tweetService = new TweetService()
