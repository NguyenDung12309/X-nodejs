import express from 'express'
import userRouter from './routes/user.js'
import { databaseService } from './services/db.js'
import path from 'path'
import i18n, { __ } from 'i18n'
import { defaultErrorHandler } from './middlewares/error.js'
const app = express()
const port = 3000

app.use(express.json())
databaseService.connect()

i18n.configure({
  locales: ['vi'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'vi',
  objectNotation: true,
  cookie: 'locale'
})

app.use(i18n.init)

app.use('/api', userRouter)

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
