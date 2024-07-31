import express from 'express'
import userRouter from './routes/user.js'
import { databaseService } from './services/db.js'
import { defaultErrorHandler } from './middlewares/error.js'
import { useI18n } from './helpers/i18n.js'
const app = express()
const port = 3000

app.use(express.json())
databaseService.connect()

app.use(useI18n.init)

app.use('/api', userRouter)

app.use(defaultErrorHandler)

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`)
})
