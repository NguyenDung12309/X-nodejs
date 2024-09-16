import { handleResponseSuccess } from '@/helpers/handler'
import {
  reqAuthorization,
  reqRefreshToken,
  reqVerifyEmailToken,
  resAuthToken,
  resVerifyMailToken
} from '@/models/dto/token/token'

import { UserSchema } from '@/models/schemas/user'
import { databaseService } from '@/services/db'
import { tokenService } from '@/services/token'
import { userService } from '@/services/user'
import { Controller, UserVerifyStatus } from '@/types/type'
import { ObjectId } from 'mongodb'
import { verifyToken } from '@/helpers/jwt'
import { RefreshTokenSchema } from '@/models/schemas/refreshToken'
import { ENV_CONST } from '@/constraints/common'

export const getNewAccessTokenController: Controller<reqRefreshToken> = async (req, res) => {
  const refreshTokenInfo = tokenService.refreshTokenInfo

  const token = req.body.refresh_token
  const { exp, iat } = await verifyToken<RefreshTokenSchema>({ token: token, privateKey: ENV_CONST.refreshKey || '' })

  const [_, result] = await Promise.all([
    databaseService.refreshToken.deleteOne({ token }),
    tokenService.createAccessAndRefreshToken({
      user_id: refreshTokenInfo?.user_id as ObjectId,
      verify: refreshTokenInfo?.verify as UserVerifyStatus,
      exp: exp,
      iat: iat
    })
  ])

  return handleResponseSuccess<resAuthToken>(res, {
    data: {
      access_token: result.accessToken,
      refresh_token: result.refreshToken
    }
  })
}

export const verifyEmailController: Controller<reqVerifyEmailToken> = async (req, res) => {
  const userInfo = userService.userInfo as UserSchema

  const [_, token] = await Promise.all([
    userService.updateUser({
      email_verify_token: '',
      verify: UserVerifyStatus.verified
    }),
    tokenService.createAccessAndRefreshToken({
      user_id: userInfo?._id as ObjectId,
      verify: userInfo?.verify as UserVerifyStatus
    })
  ])

  return handleResponseSuccess<resAuthToken>(res, {
    data: {
      access_token: token.accessToken,
      refresh_token: token.refreshToken
    }
  })
}

export const resendMailTokenController: Controller<reqAuthorization> = async (req, res) => {
  const userInfo = userService.userInfo as UserSchema

  const newVerifyToken = await tokenService.signEmailVerifyToken({
    user_id: userInfo._id as ObjectId,
    verify: userInfo.verify as UserVerifyStatus
  })

  await userService.updateUser({
    email_verify_token: newVerifyToken,
    verify: UserVerifyStatus.unverified
  })

  return handleResponseSuccess<resVerifyMailToken>(res, {
    data: {
      email_verify_token: newVerifyToken
    }
  })
}
