import e, { NextFunction, Request, Response } from 'express'

export interface RequestTypes<TBody, TQuery = unknown> extends Request<{}, any, TBody, TQuery> {}

export type MiddleWare = (req: Request, res: Response, next: NextFunction) => void

export type ErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => void

export type Controller<TBody, TQuery = unknown> = (
  req: RequestTypes<TBody, TQuery>,
  res: Response,
  next?: NextFunction
) => Promise<e.Response<any, Record<string, any>>>

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
