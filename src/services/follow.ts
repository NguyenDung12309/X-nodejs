import { UserDto } from '@/models/dto/users'
import { databaseService } from './db'
import { ObjectId } from 'mongodb'
import { omit } from 'lodash'
import { ErrorWithStatus } from '@/types/errors'
import { useI18n } from '@/helpers/i18n'
import { HTTP_STATUS } from '@/constraints/httpStatus'

class FollowService {
  followerInfo: UserDto | undefined

  findFollower = async (followerId: string) => {
    const result = await databaseService.users.findOne({ _id: new ObjectId(followerId) })
    const omitResult = omit(result, ['email_verify_token', 'password', 'forgot_password_token'])

    if (!result) {
      this.resetFollowerInfo()

      throw new ErrorWithStatus({
        message: useI18n.__('validate.common.notExist', { field: 'id' }),
        statusCode: HTTP_STATUS.NOT_FOUND
      })
    }

    this.followerInfo = omitResult

    return result
  }

  findFollowDocument = async ({
    user_id,
    followed_user_id
  }: {
    user_id: string | ObjectId
    followed_user_id: string | ObjectId
  }) => {
    return databaseService.follow.findOne({
      user_id: new ObjectId(user_id),
      followed_user_id: new ObjectId(followed_user_id)
    })
  }

  resetFollowerInfo = () => {
    this.followerInfo = undefined
  }
}

export const followService = new FollowService()
