import { IValidators, validators } from '@/middlewares';
import { NextFunction, Request, Response } from 'express';
import { has } from 'lodash';

export const validatorMiddleWare = function (validator: keyof IValidators) {
  if (!has(validators, validator)) throw new Error(`'${validator}' is not exist`);

  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await validators[validator].validateAsync(req.body);

      next();
    } catch (err) {
      res.status(400).json({
        err,
      });
    }
  };
};

