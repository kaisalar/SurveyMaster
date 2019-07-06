const _ = require('lodash')
const Joi = require('joi')
const { getErrorMessages } = require('../models/validationSchemas')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const express = require('express')
const devDebugger = require('../debugger');
const router = express.Router()

// @route  Post api/auth
// @desc   authinticate a User
// @access Public
router.post('/', async (req, res) => {
  try {
    devDebugger("post to api/auth with req.body: ", req.body);
    // Validation
    const { error } = validateSignInInfo(req.body)
    if (error) {
      devDebugger("error on auth:", getErrorMessages(error));
      return res.status(400).send(getErrorMessages(error))
    }
    // Check if the user informations
    let user = await User.findByEmail(req.body.email)
    if (!user) {
      devDebugger("error: email or password invalid")
      return res.status(400).send('Invalid email or password.')
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      devDebugger("error: email or password invalid")
      return res.status(400).send('Invalid email or password.')
    }
    // Create a token
    const token = user.generateAuthToken()
    devDebugger("auth done.", token);
    res.send(token)
  } catch (e) {
    devDebugger("error bad connection:", e);
    return res.status(400).send('bad connection.');
  }
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
