import { API_CONST } from '@/constraints/api'
import { HTTP_STATUS } from '@/constraints/httpStatus'
import { wrapRequestHandler } from '@/helpers/handler'
import { validatorMiddleWare } from '@/helpers/validate'
import express from 'express'

const router = express.Router()

router.get(API_CONST.me, wrapRequestHandler('getMeController'))

router.get(
  API_CONST.userProfile,
  validatorMiddleWare({ validator: 'userProfileValidate', location: 'query', initStatusCode: HTTP_STATUS.BAD_REQUEST }),
  wrapRequestHandler('userProfileController')
)

router.patch(
  API_CONST.meUpdate,
  validatorMiddleWare({
    validator: 'meUpdateValidate'
  }),
  wrapRequestHandler('meUpdateController')
)

export const userRouter = router
