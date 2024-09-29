import { useI18n } from '@/helpers/i18n'
import { tweetService } from '@/services/tweet'
import { ErrorWithStatus } from '@/types/errors'

export const checkTweetExists = async (tweetId: string) => {
  const isExist = await tweetService.getTweet(tweetId)

  if (!isExist)
    throw new ErrorWithStatus({
      message: useI18n.__('validate.common.notExist', { field: 'tweetId' }),
      statusCode: 404
    })
}
