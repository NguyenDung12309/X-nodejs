import { API_CONST } from '@/constraints/api'
import { wrapRequestHandler } from '@/helpers/handler'
import { validatorMiddleWare } from '@/helpers/validate'
import express from 'express'

const router = express.Router()

router.post(
  API_CONST.createTweet,
  validatorMiddleWare({ validator: 'createTweetValidate' }),
  wrapRequestHandler('createTweetController')
)

router.get(API_CONST.tweet, wrapRequestHandler('getTweetController'))

export const tweetRouter = router
