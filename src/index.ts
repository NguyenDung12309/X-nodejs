import express from 'express'
import { databaseService } from './services/db.js'
import { useI18n } from './helpers/i18n.js'
import { USER_API_CONST } from './constraints/api.js'
import { validatorMiddleWare } from './helpers/validate.js'
import { HTTP_STATUS } from './constraints/httpStatus.js'
import { tokenRouter } from './routes/token.js'
import { authRouter } from './routes/auth.js'
import { userRouter } from './routes/user.js'
import { followRouter } from './routes/follow.js'
import { mediaRouter } from './routes/media.js'
import { port } from './constraints/common.js'
import { mediaService } from './services/media.js'
import { defaultErrorHandler } from './middlewares/error.js'
import { UPLOAD_IMAGE_DIR, UPLOAD_IMAGE_PATH, UPLOAD_VIDEO_DIR, UPLOAD_VIDEO_PATH } from './constraints/path.js'
const app = express()

const routers = [userRouter, tokenRouter, authRouter, followRouter, mediaRouter]

app.use(express.json())

databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshToken()
  databaseService.indexFollow()
})
mediaService.createUploadFolder()

app.use('/' + UPLOAD_IMAGE_PATH, express.static(UPLOAD_IMAGE_DIR))
app.use('/' + UPLOAD_VIDEO_PATH, express.static(UPLOAD_VIDEO_DIR))

app.use(useI18n.init)

app.use(async (req, res, next) => {
  const url = req.path.replace('/api', '')

  if (Object.values(USER_API_CONST).includes(url)) {
    const middleWare = await validatorMiddleWare({
      validator: 'accessTokenValidate',
      location: 'headers',
      initStatusCode: HTTP_STATUS.UNAUTHORIZED
    })

    return middleWare(req, res, next)
  }

  next()
})

routers.forEach((router) => app.use('/api', router))

app.use(defaultErrorHandler)

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`)
})
