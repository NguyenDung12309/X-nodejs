import { IRequestHandler, requestHandler } from '@/middlewares'
import { NextFunction, Request, Response } from 'express'

export const wrapRequestHandler = (controller: keyof IRequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler[controller](req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
