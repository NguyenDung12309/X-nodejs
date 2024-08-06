import { handleResponseSuccess } from '@/helpers/handler'
import {
  reqAccessToken,
  reqAuthorization,
  reqVerifyEmail,
  resRessendMailToken,
  resToken
} from '@/models/dto/users/token'
import { UserSchema } from '@/models/schemas/user'
import { databaseService } from '@/services/db'
import { userService } from '@/services/user'
import { Controller, UserVerifyStatus } from '@/types/type'
import { ObjectId } from 'mongodb'

export const getNewAccessTokenController: Controller<reqAccessToken> = async (req, res) => {
  const refreshTokenInfo = userService.refreshTokenInfo

  const token = req.body.refresh_token.split(' ')[1]

  const [_, result] = await Promise.all([
    databaseService.refreshToken.deleteOne({ token }),
    userService.getAccessAndRefreshToken({
      user_id: refreshTokenInfo?.user_id as ObjectId,
      verify: refreshTokenInfo?.verify as UserVerifyStatus
    })
  ])

  return handleResponseSuccess<resToken>(res, {
    data: {
      access_token: result.accessToken,
      refresh_token: result.refreshToken
    }
  })
}

export const verifyEmailController: Controller<reqVerifyEmail> = async (req, res) => {
  const userInfo = userService.userInfo as UserSchema

  const [_, token] = await Promise.all([
    databaseService.users.updateOne(
      {
        _id: userInfo?._id
      },
      {
        $set: {
          email_verify_token: '',
          verify: UserVerifyStatus.verified
        },
        $currentDate: {
          updated_at: true
        }
      }
    ),
    userService.getAccessAndRefreshToken({
      user_id: userInfo?._id as ObjectId,
      verify: userInfo?.verify as UserVerifyStatus
    })
  ])

  return handleResponseSuccess<resToken>(res, {
    data: {
      access_token: token.accessToken,
      refresh_token: token.refreshToken
    }
  })
}

export const resendMailTokenController: Controller<reqAuthorization> = async (req, res) => {
  const userInfo = userService.userInfo as UserSchema

  const newVerifyToken = await userService.signEmailVerifyToken({
    user_id: userInfo._id as ObjectId,
    verify: userInfo.verify as UserVerifyStatus
  })

  await databaseService.users.updateOne(
    {
      _id: userInfo?._id
    },
    {
      $set: {
        email_verify_token: newVerifyToken,
        verify: UserVerifyStatus.unverified
      },
      $currentDate: {
        updated_at: true
      }
    }
  )

  return handleResponseSuccess<resRessendMailToken>(res, {
    data: {
      email_verify_token: newVerifyToken
    }
  })
}
