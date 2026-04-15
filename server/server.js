const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

const envPath = path.join(__dirname, '.env')
if (fs.existsSync(envPath)) {
  let s = fs.readFileSync(envPath, 'utf8')
  if (s.charCodeAt(0) === 0xfeff) s = s.slice(1)
  const parsed = dotenv.parse(s)
  for (const [k, v] of Object.entries(parsed)) {
    if (process.env[k] === undefined) process.env[k] = v
  }
}
const express = require('express')
const cors = require('cors')
const connectDb = require('./db')
const userLogic = require('./routes/userLogic')
const taskRoutes = require('./routes/taskRoutes')

if (!process.env.JWT_SECRET) {
  console.log('need JWT_SECRET in .env')
  process.exit(1)
}

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.use('/api/users', userLogic)
app.use('/api/tasks', taskRoutes)

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log('server on port', PORT)
  })
})
