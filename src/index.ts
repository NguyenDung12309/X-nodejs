import express from 'express'
import userRouter from './routes/user.js'
import { databaseService } from './services/db.js'
import path from 'path'
import i18n, { __ } from 'i18n'
const app = express()
const port = 3000

app.use(express.json())
databaseService.connect()

i18n.configure({
  locales: ['vi'], // Add the locales you want to support
  directory: path.join(__dirname, 'locales'), // Path to the locales directory
  defaultLocale: 'vi', // Default locale
  objectNotation: true, // Use dot notation for nested keys
  cookie: 'locale', // The name of the cookie to store the locale
});

app.use(i18n.init)

app.use('/api', userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
