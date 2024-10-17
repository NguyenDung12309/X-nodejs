import { ObjectId } from 'mongodb'

export const getTweetAggregation = (tweetId: string) => {
  return [
    { $match: { _id: new ObjectId(tweetId) } },
    {
      $lookup: {
        from: 'hashtag',
        localField: 'hashtags',
        foreignField: '_id',
        as: 'hashtags'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'mentions',
        foreignField: '_id',
        as: 'mentions'
      }
    },
    {
      $addFields: {
        mentions: {
          $map: {
            input: '$mentions',
            as: 'mention',
            in: {
              _id: '$$mention.name',
              name: '$$mention.name',
              avatar: '$$mention.avatar',
              email: '$$mention.email',
              date_of_birth: '$$mention.date_of_birth',
              bio: '$$mention.bio',
              location: '$$mention.location',
              website: '$$mention.website',
              username: '$$mention.username',
              cover_photo: '$$mention.cover_photo'
            }
          }
        }
      }
    },
    {
      $lookup: {
        from: 'tweet',
        localField: '_id',
        foreignField: 'parent_id',
        as: 'tweet_child'
      }
    },
    {
      $lookup: {
        from: 'bookmark',
        localField: '_id',
        foreignField: 'tweet_id',
        as: 'bookmark_count'
      }
    },
    {
      $addFields: {
        bookmark_count: {
          $size: '$bookmark_count'
        },
        retweet_count: {
          $size: {
            $filter: {
              input: '$tweet_child',
              as: 'tweet',
              cond: { $eq: ['$$tweet.type', 1] }
            }
          }
        },
        comment_count: {
          $size: {
            $filter: {
              input: '$tweet_child',
              as: 'tweet',
              cond: { $eq: ['$$tweet.type', 2] }
            }
          }
        },
        quote_count: {
          $size: {
            $filter: {
              input: '$tweet_child',
              as: 'tweet',
              cond: { $eq: ['$$tweet.type', 3] }
            }
          }
        },
        views: {
          $add: ['$guest_views', '$user_views']
        }
      }
    }
  ]
}
