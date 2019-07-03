const { port } = require('./config')
const cors = require('cors')
const express = require('express')
const app = express()
const devDebugger = require('./debugger');
const morgan = require('morgan');
devDebugger("DEVUG=app:developer");

const surveysRouter = require('./routes/surveysRouter')
const fillRouter = require('./routes/fillRouter')
const usersRouter = require('./routes/usersRouter')
const authRouter = require('./routes/authenticationRouter')
const surveyUsersRouter = require('./routes/surveyUsersRouter');

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'));
// Routes
app.use('/api/users', usersRouter)
app.use('/api/surveys', surveysRouter)
app.use('/fill', fillRouter)
app.use('/api/auth', authRouter)
app.use('/api/surveyUsers', surveyUsersRouter);
app.get('/api', (req, res) => {
  res.send({ data: 'hello from api' })
})
app.listen(port, () => {
  console.log(`We are live on ${port}`)
})
