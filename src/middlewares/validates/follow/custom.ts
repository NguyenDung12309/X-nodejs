import { HTTP_STATUS } from '@/constraints/httpStatus'
import { useI18n } from '@/helpers/i18n'
import { objectToString } from '@/helpers/utils'
import { UserSchema } from '@/models/schemas/user'
import { followService } from '@/services/follow'
import { userService } from '@/services/user'
import { ErrorWithStatus } from '@/types/errors'
import { CustomHelpers } from 'joi'
import { ObjectId } from 'mongodb'

export const isFollow = async (followerId: string, helper: CustomHelpers) => {
  const { _id } = userService.userInfo as UserSchema

  const result = await followService.findFollowDocument({
    user_id: _id as ObjectId,
    followed_user_id: followerId
  })

  if (result) {
    const externalMessage = helper.message({
      external: objectToString(
        new ErrorWithStatus({
          message: useI18n.__('validate.common.followed'),
          statusCode: HTTP_STATUS.CONFLICT
        })
      )
    })

    return externalMessage
  }

  return followerId
}
