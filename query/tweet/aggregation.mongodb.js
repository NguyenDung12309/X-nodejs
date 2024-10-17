/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

const { ObjectId } = require('mongodb')

// Select the database to use.
use('X')

// Create a new document in the collection.

const tweetCollection = db.getCollection('tweet')

tweetCollection.aggregate([
  { $match: { _id: new ObjectId('670f342fde5e0ea06e36f77c') } },
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
])
