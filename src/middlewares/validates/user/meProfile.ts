import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/validate'
import { reqMeProfile } from '@/models/dto/users/meProfile'

export const meProfileValidate = joi.object<reqMeProfile>({
  avatar: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqMeProfile>({
        field: 'avatar'
      })
    ),
  bio: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqMeProfile>({
        field: 'bio'
      })
    ),
  cover_photo: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqMeProfile>({
        field: 'cover_photo'
      })
    ),
  date_of_birth: joi
    .date()
    .iso()
    .messages(
      getCommonMessageValidate<reqMeProfile>({
        field: 'date_of_birth'
      })
    ),

  location: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqMeProfile>({
        field: 'location'
      })
    ),
  name: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqMeProfile>({
        field: 'name'
      })
    ),
  username: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqMeProfile>({
        field: 'username'
      })
    ),
  website: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqMeProfile>({
        field: 'website'
      })
    )
})
