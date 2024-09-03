import { API_CONST } from '@/constraints/api'
import { wrapRequestHandler } from '@/helpers/handler'
import express from 'express'

const router = express.Router()

router.post(API_CONST.uploadMedia, wrapRequestHandler('uploadImageController'))

export const mediaRouter = router
