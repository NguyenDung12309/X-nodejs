import { NextFunction, Request, Response } from 'express'

interface RequestTypes<T> extends Request {
  body: T
}

export type MiddleWare = (req: Request, res: Response, next: NextFunction) => void

export type ErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => void

export type Controller<T> = (req: RequestTypes<T>, res: Response, next?: NextFunction) => void

export enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken
}

export enum UserVerifyStatus {
  unverified,
  verified,
  banned
}
