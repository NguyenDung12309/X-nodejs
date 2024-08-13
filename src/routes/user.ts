import { API_CONST } from '@/constraints/api'
import { wrapRequestHandler } from '@/helpers/handler'
import { validatorMiddleWare } from '@/helpers/validate'
import express from 'express'

const router = express.Router()

router.get(API_CONST.me, wrapRequestHandler('getMeController'))

router.patch(
  API_CONST.meProfile,
  validatorMiddleWare({
    validator: 'meProfileValidate'
  }),
  wrapRequestHandler('meProfileController')
)

export const userRouter = router
