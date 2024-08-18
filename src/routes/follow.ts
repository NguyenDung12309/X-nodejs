import { API_CONST } from '@/constraints/api'
import { HTTP_STATUS } from '@/constraints/httpStatus'
import { wrapRequestHandler } from '@/helpers/handler'
import { validatorMiddleWare } from '@/helpers/validate'
import express from 'express'

const router = express.Router()

router.post(
  API_CONST.follow,
  validatorMiddleWare({
    validator: 'followValidate',
    initStatusCode: HTTP_STATUS.BAD_REQUEST
  }),
  wrapRequestHandler('followController')
)

router.delete(
  API_CONST.follow,
  validatorMiddleWare({
    validator: 'unFollowValidate',
    initStatusCode: HTTP_STATUS.BAD_REQUEST
  }),
  wrapRequestHandler('unFollowController')
)

export const followRouter = router
