import { API_CONST } from '@/constraints/api'
import { HTTP_STATUS } from '@/constraints/httpStatus'
import { wrapRequestHandler } from '@/helpers/handler'
import { validatorMiddleWare } from '@/helpers/validate'
import express from 'express'

const router = express.Router()

router.post(
  API_CONST.bookmark,
  validatorMiddleWare({ validator: 'createBookmarkValidate', initStatusCode: HTTP_STATUS.BAD_REQUEST }),
  wrapRequestHandler('createBookmarkController')
)

router.delete(
  API_CONST.bookmark,
  validatorMiddleWare({
    validator: 'deleteBookmarkValidate',
    location: 'query',
    initStatusCode: HTTP_STATUS.BAD_REQUEST
  }),
  wrapRequestHandler('deleteBookmarkController')
)

export const bookmarkRouter = router
