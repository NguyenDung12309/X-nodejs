import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/message'
import { reqMeUpdate } from '@/models/dto/users/meUpdate'

export const meUpdateValidate = joi.object<reqMeUpdate>({
  avatar: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqMeUpdate>({
        field: 'avatar'
      })
    ),
  bio: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqMeUpdate>({
        field: 'bio'
      })
    ),
  cover_photo: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqMeUpdate>({
        field: 'cover_photo'
      })
    ),
  date_of_birth: joi
    .date()
    .iso()
    .messages(
      getCommonMessageValidate<reqMeUpdate>({
        field: 'date_of_birth'
      })
    ),

  location: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqMeUpdate>({
        field: 'location'
      })
    ),
  name: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqMeUpdate>({
        field: 'name'
      })
    ),
  username: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqMeUpdate>({
        field: 'username'
      })
    ),
  website: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqMeUpdate>({
        field: 'website'
      })
    )
})
