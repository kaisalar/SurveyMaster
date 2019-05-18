const _ = require('lodash')
const { getErrorMessages } = require('../models/validationSchemas')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const express = require('express')
const auth = require('../middlewares/authorization')

const router = express.Router()

// @route  Post api/users
// @desc   Post a User
// @access Public
router.post('/', async (req, res) => {
  // Validation
  const { error } = User.validate(req.body)
  if (error) return res.status(400).send(getErrorMessages(error))

  // Check if the user is registered
  let user = await User.findByEmail(req.body.email)
  if (user) return res.status(400).send('The user is registered.')

  // Create user
  user = new User(_.pick(req.body, ['firstName', 'lastName', 'email']))

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  user.password = hashedPassword

  // Save user to DB
  await user.save()

  // generate json web token
  const token = user.generateAuthToken()
  res.setHeader('x-auth-token', token)
  res.send(_.pick(user, ['_id', 'firstName', 'lastName', 'email']))
})

// @route  GET api/users
// @desc   Get the current User
// @access Private
router.get('/me', auth, async (req, res) => {
  // load the user from the DB
  const user = await User.findById(req.user._id)

  // send the user
  res.send(_.pick(user, ['_id', 'firstName', 'lastName', 'email', 'surveys']))
})

module.exports = router
