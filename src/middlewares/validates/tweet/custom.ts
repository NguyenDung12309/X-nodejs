import { HTTP_STATUS } from '@/constraints/httpStatus'
import { useI18n } from '@/helpers/i18n'
import { objectToString } from '@/helpers/utils'
import { tweetService } from '@/services/tweet'
import { userService } from '@/services/user'
import { ErrorWithStatus } from '@/types/errors'
import { TweetAudience, TweetType, UserVerifyStatus } from '@/types/type'
import { CustomHelpers } from 'joi'
import { isEmpty } from 'lodash'
import { ObjectId } from 'mongodb'

export const checkParentId = async (value: string, helper: CustomHelpers) => {
  const type = helper.state.ancestors[0].type

  if ([TweetType.QuoteTweet, TweetType.Comment, TweetType.Retweet].includes(type) && !ObjectId.isValid(value)) {
    const externalMessage = helper.message({
      external: objectToString(
        new ErrorWithStatus({
          message: useI18n.__('validate.common.invalid', { field: 'parent_id' }),
          statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY
        })
      )
    })

    return externalMessage
  }

  if (type === TweetType.Tweet && value !== null) {
    const externalMessage = helper.message({
      external: objectToString(
        new ErrorWithStatus({
          message: useI18n.__('validate.common.fieldType', { field: 'parent_id', type: 'null' }),
          statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY
        })
      )
    })

    return externalMessage
  }

  return true
}

export const checkContent = async (value: string, helper: CustomHelpers) => {
  const type = helper.state.ancestors[0].type
  const hagtags = helper.state.ancestors[0].hagtags
  const mentions = helper.state.ancestors[0].mentions

  if (
    [TweetType.QuoteTweet, TweetType.Comment, TweetType.Tweet].includes(type) &&
    isEmpty(hagtags) &&
    isEmpty(mentions) &&
    !value
  ) {
    const externalMessage = helper.message({
      external: objectToString(
        new ErrorWithStatus({
          message: useI18n.__('validate.common.require', { field: '111content' }),
          statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY
        })
      )
    })

    return externalMessage
  }

  if (type === TweetType.Retweet && value !== '') {
    const externalMessage = helper.message({
      external: objectToString(
        new ErrorWithStatus({
          message: useI18n.__('validate.common.fieldType', { field: 'content', type: 'null' }),
          statusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY
        })
      )
    })

    return externalMessage
  }

  return value
}

export const checkTweetExists = async (tweetId: string, helper: CustomHelpers) => {
  const isExist = await tweetService.getTweet(tweetId)

  if (!isExist) {
    const externalMessage = helper.message({
      external: objectToString(
        new ErrorWithStatus({
          message: useI18n.__('validate.common.notExist', { field: 'tweetId' }),
          statusCode: HTTP_STATUS.NOT_FOUND
        })
      )
    })

    return externalMessage
  }

  return tweetId
}

export const checkAudienceCircle = async (tweetId: string, helpers: CustomHelpers) => {
  const validTweetId = await checkTweetExists(tweetId, helpers)

  if (typeof validTweetId !== 'string') {
    return validTweetId
  }

  const tweetInfo = tweetService.tweetInfo

  if (!userService.userInfo && tweetInfo?.audience === TweetAudience.TwitterCircle) {
    const externalMessage = helpers.message({
      external: objectToString(
        new ErrorWithStatus({
          message: useI18n.__('validate.common.notLogin'),
          statusCode: HTTP_STATUS.UNAUTHORIZED
        })
      )
    })

    return externalMessage
  }

  const userTweetInfo = await userService.findUserInfo(
    {
      _id: tweetInfo?.user_id
    },
    true
  )

  if (
    !userTweetInfo ||
    userTweetInfo.verify === UserVerifyStatus.unverified ||
    userTweetInfo.verify === UserVerifyStatus.banned
  ) {
    const externalMessage = helpers.message({
      external: objectToString(
        new ErrorWithStatus({
          message: useI18n.__('validate.common.userNotValid'),
          statusCode: HTTP_STATUS.NOT_FOUND
        })
      )
    })

    return externalMessage
  }

  const isUserInCircle = userTweetInfo.twitter_circle?.some((item) => {
    const result = new ObjectId(item).equals(userService.userInfo?._id)

    return result
  })

  if (!isUserInCircle && !userService.userInfo?._id?.equals(tweetInfo?.user_id)) {
    const externalMessage = helpers.message({
      external: objectToString(
        new ErrorWithStatus({
          message: useI18n.__('validate.common.notPublic', { field: 'tweet' }),
          statusCode: HTTP_STATUS.FORBIDDEN
        })
      )
    })

    return externalMessage
  }

  return tweetId
}
