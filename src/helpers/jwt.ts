import { ErrorWithStatus } from './../types/errors'
import jwt, { SignOptions } from 'jsonwebtoken'
import 'dotenv/config'
import { HTTP_STATUS } from '@/constraints/httpStatus'

const optional: SignOptions = {
  algorithm: 'HS256'
}

export const signToken = ({
  payload,
  privateKey = process.env.SECRET_KEY as string,
  options
}: {
  payload: string | object
  privateKey?: string
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

export const verifyToken = <T>({
  token,
  privateKey = process.env.SECRET_KEY as string
}: {
  token: string
  privateKey?: string
}) => {
  return new Promise<T>((resolve, reject) => {
    const newToken = token.split(' ')[1]

    jwt.verify(newToken, privateKey, (error, decoded) => {
      if (error) {
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
