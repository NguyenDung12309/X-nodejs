import { ErrorWithStatus } from './../types/errors'
import jwt, { SignOptions } from 'jsonwebtoken'
import 'dotenv/config'
import { HTTP_STATUS } from '@/constraints/httpStatus'
import { userService } from '@/services/user'

const optional: SignOptions = {
  algorithm: 'HS256'
}

export const signToken = ({
  payload,
  privateKey,
  options
}: {
  payload: string | object
  privateKey: string
  options?: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, { ...optional, ...options }, (error, token) => {
      if (error) {
        throw reject(error)
      }
      resolve(token as string)
    })
  })
}

export const verifyToken = <T>({ token, privateKey }: { token: string; privateKey: string }) => {
  return new Promise<T>((resolve, reject) => {
    const newToken = token.includes('Bearer') ? token.split(' ')[1] : token

    jwt.verify(newToken, privateKey, (error, decoded) => {
      if (error) {
        userService.resetUserInfo()

        return reject(
          new ErrorWithStatus({
            message: error.toString(),
            statusCode: HTTP_STATUS.UNAUTHORIZED
          })
        )
      }

      resolve(decoded as T)
    })
  })
}
