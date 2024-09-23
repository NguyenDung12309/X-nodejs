import { HTTP_STATUS } from '@/constraints/httpStatus'
import { useI18n } from '@/helpers/i18n'
import { objectToString } from '@/helpers/utils'
import { ErrorWithStatus } from '@/types/errors'
import { TweetType } from '@/types/type'
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
          message: useI18n.__('validate.common.require', { field: 'content' }),
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
