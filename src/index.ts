import express from 'express'
import userRouter from './routes/user.js'
import { databaseService } from './services/db.js'
const app = express()
const port = 3000

app.use(express.json())
databaseService.connect()
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
