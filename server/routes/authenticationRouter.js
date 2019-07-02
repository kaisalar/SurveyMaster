const _ = require('lodash')
const Joi = require('joi')
const { getErrorMessages } = require('../models/validationSchemas')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const express = require('express')

const router = express.Router()

// @route  Post api/auth
// @desc   authinticate a User
// @access Public
router.post('/', async (req, res) => {
  // Validation
  const { error } = validateSignInInfo(req.body)
  if (error) return res.status(400).send(getErrorMessages(error))

  // Check if the user informations
  let user = await User.findByEmail(req.body.email)
  if (!user) return res.status(400).send('Invalid email or password.')
  //DA Was HERE XD

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send('Invalid email or password.')

  // Create a token
  const token = user.generateAuthToken()
  res.send(token)
})

function validateSignInInfo(signInInfo) {
  const schema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .max(255)
      .required()
  }
  const result = Joi.validate(signInInfo, schema)
  return result
}

module.exports = router
