import jwt, { SignOptions } from 'jsonwebtoken'
import 'dotenv/config'

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
  return new Promise<string | Error>((resolve, reject) => {
    jwt.sign(payload, privateKey, { ...optional, ...options }, (error, token) => {
      if (error) {
        throw reject(error)
      }
      resolve(token as string)
    })
  })
}
