import express from 'express'
import cors from 'cors'
import { formatDate, type User, API_VERSION } from '@repo/shared'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    version: API_VERSION,
    timestamp: formatDate(new Date()),
  })
})

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
})
