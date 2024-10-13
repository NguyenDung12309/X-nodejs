import { HTTP_STATUS } from '@/constraints/httpStatus'
import { useI18n } from '@/helpers/i18n'
import { objectToString } from '@/helpers/utils'
import { tweetService } from '@/services/tweet'
import { ErrorWithStatus } from '@/types/errors'
import { CustomHelpers } from 'joi'

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
