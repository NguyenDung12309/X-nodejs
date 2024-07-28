
import { reqRegister } from '@/models/dto/register';
import { registerValidate } from './user';
import Joi, { ObjectSchema } from 'joi';

export interface IValidators {
  registerValidate: ObjectSchema<reqRegister>;
}

export const validators: IValidators = {
  registerValidate: registerValidate,
};