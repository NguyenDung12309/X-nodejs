import { databaseService } from './db'
import { ObjectId } from 'mongodb'
import { BookmarkSchema } from '@/models/schemas/bookmark'

export class BookmarkService {
  createBookmark = async (userId: string | ObjectId, tweetId: string) => {
    const result = await databaseService.bookmark.findOneAndUpdate(
      {
        tweet_id: new ObjectId(tweetId),
        user_id: new ObjectId(userId)
      },
      {
        $setOnInsert: new BookmarkSchema({
          _id: new ObjectId(),
          user_id: new ObjectId(userId),
          tweet_id: new ObjectId(tweetId)
        })
      },
      { upsert: true, returnDocument: 'after' }
    )

    return result
  }

  deleteBookmark = async (userId: string | ObjectId, tweetId: string) => {
    const result = await databaseService.bookmark.deleteOne({
      tweet_id: new ObjectId(tweetId),
      user_id: new ObjectId(userId)
    })

    return result
  }
}

export const bookmarkService = new BookmarkService()
