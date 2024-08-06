import { joi } from '@/helpers/joi'
import { getCommonMessageValidate } from '@/helpers/validate'
import { reqUpdateProfile } from '@/models/dto/users/updateProfile'

export const updateProfileValidate = joi.object<reqUpdateProfile>({
  avatar: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqUpdateProfile>({
        field: 'avatar'
      })
    ),
  bio: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqUpdateProfile>({
        field: 'bio'
      })
    ),
  cover_photo: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqUpdateProfile>({
        field: 'cover_photo'
      })
    ),
  date_of_birth: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqUpdateProfile>({
        field: 'date_of_birth'
      })
    ),

  location: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqUpdateProfile>({
        field: 'location'
      })
    ),
  name: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqUpdateProfile>({
        field: 'name'
      })
    ),
  username: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqUpdateProfile>({
        field: 'username'
      })
    ),
  website: joi
    .string()
    .trim()
    .messages(
      getCommonMessageValidate<reqUpdateProfile>({
        field: 'website'
      })
    )
})
