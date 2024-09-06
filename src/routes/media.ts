import { API_CONST } from '@/constraints/api'
import { wrapRequestHandler } from '@/helpers/handler'
import express from 'express'

const router = express.Router()

router.post(API_CONST.uploadImage, wrapRequestHandler('uploadImageController'))

router.post(API_CONST.uploadVideo, wrapRequestHandler('uploadVideoController'))

export const mediaRouter = router
