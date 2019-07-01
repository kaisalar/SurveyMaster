const { port, yandixKey } = require('./config')
const cors = require('cors')
const express = require('express')
const app = express()
const surveysRouter = require('./routes/surveysRouter')
const fillRouter = require('./routes/fillRouter')
const usersRouter = require('./routes/usersRouter')
const authRouter = require('./routes/authenticationRouter')
const surveyUsersRouter = require('./routes/surveyUsersRouter');
// const translate = require('@vitalets/google-translate-api');
const Language = require('./models/languages')
// translate('{ABCD:how are you ?}', { to:'ar' }).then(res=> {
//   console.log(res);
// })

async function tes() {
  Language.translate("رز", "ar-en", (word) => {
    const resalut = word;
    console.log(resalut);
  })
}
// tes()

app.use(express.json())
app.use(cors())

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
