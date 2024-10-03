import { REGEX_USERNAME } from '@/constraints/regex'
import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/message'
import { ReqMeUpdate } from '@/models/dto/users/meUpdate'
import { checkUserCircleExist, checkUserNameExist } from './custom'

export const meUpdateValidate = joi.object<ReqMeUpdate>({
  avatar: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<ReqMeUpdate>({
        field: 'avatar'
      })
    ),
  bio: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<ReqMeUpdate>({
        field: 'bio'
      })
    ),
  cover_photo: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<ReqMeUpdate>({
        field: 'cover_photo'
      })
    ),
  date_of_birth: joi
    .date()
    .iso()
    .messages(
      getCommonMessageValidate<ReqMeUpdate>({
        field: 'date_of_birth'
      })
    ),

  location: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<ReqMeUpdate>({
        field: 'location'
      })
    ),
  name: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<ReqMeUpdate>({
        field: 'name'
      })
    ),
  username: joi
    .string()
    .trim()
    .regex(REGEX_USERNAME)
    .external(checkUserNameExist)
    .required()
    .messages(
      getCommonMessageValidate<ReqMeUpdate>({
        field: 'username'
      })
    ),
  website: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<ReqMeUpdate>({
        field: 'website'
      })
    ),
  twitter_circle: joi
    .array()
    .items(joi.string().trim().external(checkUserCircleExist))
    .messages(
      getCommonMessageValidate<ReqMeUpdate>({
        field: 'twitter_circle'
      })
    )
})
