import { API_CONST } from '@/constraints/api'
import { wrapRequestHandler } from '@/helpers/handler'
import { validatorMiddleWare } from '@/helpers/validate'
import express from 'express'

const router = express.Router()

router.get(API_CONST.tweet, validatorMiddleWare({ validator: 'tweetValidate' }), wrapRequestHandler('tweetController'))

export const tweetRouter = router
