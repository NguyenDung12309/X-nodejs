import { ReqCreateTweet } from '@/models/dto/tweet/createTweet'
import { databaseService } from './db'
import { TweetSchema } from '@/models/schemas/tweet'
import { ObjectId } from 'mongodb'
import { userService } from './user'
import { HashTagSchema } from '@/models/schemas/hashTag'
import { getTweetAggregation } from '@/helpers/aggregate/getTweet'
import { getTweetChild } from '@/helpers/aggregate/getTweetChild'
import { TweetType } from '@/types/type'

class TweetService {
  tweetInfo: TweetSchema | null
  createTweet = async (data: ReqCreateTweet) => {
    const { hashtags, parent_id, mentions, ...rest } = data

    const getHagtags = await this.checkAndCreateHashtag(hashtags)

    const convertHashtags = getHagtags.map((tag) => tag?._id) as ObjectId[]
    const convertParentId = parent_id ? new ObjectId(parent_id) : null
    const convertMentions = mentions.map((mention) => new ObjectId(mention))

    const result = await databaseService.tweet.insertOne(
      new TweetSchema({
        ...rest,
        hashtags: convertHashtags,
        parent_id: convertParentId,
        mentions: convertMentions,
        user_id: userService.userInfo?._id
      })
    )

    return result
  }

  getTweet = async (id: string) => {
    const [result] = await databaseService.tweet.aggregate<TweetSchema>(getTweetAggregation(id)).toArray()

    this.tweetInfo = result

    return result
  }

  getTweetChild = async (parentId: string, type: TweetType, limit: number, page: number) => {
    const result = await databaseService.tweet
      .aggregate<TweetSchema>(getTweetChild(parentId, type, limit, page))
      .toArray()
    const total = await databaseService.tweet.countDocuments({ parent_id: new ObjectId(parentId), type })

    return {
      tweets: result,
      total
    }
  }

  async checkAndCreateHashtag(hashtags: string[]) {
    const result = await Promise.all(
      hashtags.map(async (tag) => {
        return databaseService.hashtag.findOneAndUpdate(
          { name: tag },
          {
            $setOnInsert: new HashTagSchema({ _id: new ObjectId(), name: tag })
          },
          {
            upsert: true,
            returnDocument: 'after'
          }
        )
      })
    )

    return result
  }
}

export const tweetService = new TweetService()
