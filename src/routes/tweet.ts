import { API_CONST } from '@/constraints/api'
import { HTTP_STATUS } from '@/constraints/httpStatus'
import { wrapRequestHandler } from '@/helpers/handler'
import { validatorMiddleWare } from '@/helpers/validate'
import express from 'express'

const router = express.Router()

router.post(
  API_CONST.createTweet,
  validatorMiddleWare({ validator: 'createTweetValidate' }),
  wrapRequestHandler('createTweetController')
)

router.get(
  API_CONST.tweet,
  validatorMiddleWare({ validator: 'getTweetValidate', location: 'query', initStatusCode: HTTP_STATUS.BAD_REQUEST }),
  wrapRequestHandler('getTweetController')
)

export const tweetRouter = router
