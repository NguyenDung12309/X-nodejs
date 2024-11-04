import { TweetType } from '@/types/type'
import { ObjectId } from 'mongodb'
import { aggregateTweetBody } from './tweetBody'

export const getTweetChild = (parentId: string, type: TweetType, limit: number, page: number) => {
  return [
    { $match: { parent_id: new ObjectId(parentId), type } },
    ...aggregateTweetBody,
    { $skip: limit * (page - 1) },
    { $limit: limit }
  ]
}
