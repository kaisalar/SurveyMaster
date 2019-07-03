const _ = require('lodash')
const { getErrorMessages } = require('../models/validationSchemas')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const express = require('express')
const auth = require('../middlewares/authorization')
const devDebugger = require('../debugger');
const router = express.Router()

// @route  Post api/users
// @desc   Post a User
// @access Public
router.post('/', async (req, res) => {
  try {
    devDebugger("post to api/users with req.body: ", req.body);

    // Validation
    const { error } = User.validate(req.body)
    if (error) {
      devDebugger("error on post user: ", getErrorMessages(error));
      return res.status(400).send(getErrorMessages(error))
    }
    // Check if the user is registered
    let user = await User.findByEmail(req.body.email)
    if (user) {
      devDebugger('The user is registered.');
      return res.status(400).send('The user is registered.')
    }
    // Create user
    user = new User(_.pick(req.body, ['firstName', 'lastName', 'email']))

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    user.password = hashedPassword

    // Save user to DB
    await user.save()

    // generate json web token
    const token = user.generateAuthToken()
    res.header('x-auth-token', token)
      .header('access-control-expose-headers', 'x-auth-token')
      .send(_.pick(user, ['_id', 'firstName', 'lastName', 'email']))
  } catch (e) {
    devDebugger("error on posting user:", e);
    return res.status(400).send('bad connection.');
  }
})

// @route  GET api/users
// @desc   Get the current User
// @access Private
router.get('/me', auth, async (req, res) => {
  devDebugger("get to: api/user/me", req.user);
  // load the user from the DB
  const user = await User.findById(req.user._id)

  // send the user
  res.send(_.pick(user, ['_id', 'firstName', 'lastName', 'email', 'surveys']))
})

module.exports = router
