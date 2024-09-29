import { API_CONST } from '@/constraints/api'
import { wrapRequestHandler } from '@/helpers/handler'
import { validatorMiddleWare } from '@/helpers/validate'
import express from 'express'

const router = express.Router()

router.post(
  API_CONST.bookmark,
  validatorMiddleWare({ validator: 'createBookmarkValidate' }),
  wrapRequestHandler('createBookmarkController')
)

router.delete(
  API_CONST.bookmark,
  validatorMiddleWare({ validator: 'deleteBookmarkValidate', location: 'query' }),
  wrapRequestHandler('deleteBookmarkController')
)

export const bookmarkRouter = router
