const { port } = require('./config')
const cors = require('cors')
const express = require('express')
const app = express()

const surveysRouter = require('./routes/surveysRouter')
const fillRouter = require('./routes/fillRouter')
const usersRouter = require('./routes/usersRouter')
const authRouter = require('./routes/authenticationRouter')

app.use(express.json())
app.use(cors())

// Routes
app.use('/api/users', usersRouter)
app.use('/api/surveys', surveysRouter)
app.use('/fill', fillRouter)
app.use('/api/auth', authRouter)

app.get('/api', (req, res) => {
  res.send({ data: 'hello from api' })
})

app.listen(port, () => {
  console.log(`We are live on ${port}`)
})
