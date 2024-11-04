import { ObjectId } from 'mongodb'
import { aggregateTweetBody } from './tweetBody'

export const getTweetAggregation = (tweetId: string) => {
  return [{ $match: { _id: new ObjectId(tweetId) } }, ...aggregateTweetBody]
}
