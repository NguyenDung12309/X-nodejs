import express from 'express'
import { databaseService } from './services/db.js'
import { defaultErrorHandler } from './middlewares/error.js'
import { useI18n } from './helpers/i18n.js'
import { USER_API_CONST } from './constraints/api.js'
import { validatorMiddleWare } from './helpers/validate.js'
import { HTTP_STATUS } from './constraints/httpStatus.js'
import { tokenRouter } from './routes/token.js'
import { authRouter } from './routes/auth.js'
import { userRouter } from './routes/user.js'
const app = express()
const port = 3000
const routers = [userRouter, tokenRouter, authRouter]

app.use(express.json())
databaseService.connect()

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
