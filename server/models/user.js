const _ = require('lodash')
const jwt = require('jsonwebtoken')
const { jwtPrivateKey } = require('../config')
const Joi = require('joi')
const Element = require('./element')
const { userSchema } = require('./validationSchemas')
const IO = require('../data/IO')

class User extends Element {
  constructor(props) {
    super(props)
    this.firstName = props.firstName || ''
    this.lastName = props.lastName || ''
    this.email = props.email || 'x@x.x'
    this.password = props.password || ''
  }

  async save() {
    await IO.saveUser(this)
  }

  static async findById(userId) {
    let user = await IO.findUserById(userId)
    if (user) {
      user = new User(user)
      return user
    }
  }

  static async findByEmail(userEmail) {
    let user = await IO.findUserByEmail(userEmail)
    if (user) {
      user = new User(user)
      return user
    }
  }

  generateAuthToken() {
    return jwt.sign(
      _.pick(this, ['_id', 'firstName', 'lastName', 'email']),
      jwtPrivateKey
    )
  }

  static validate(user) {
    const result = Joi.validate(user, userSchema)
    return result
  }
}

module.exports = User
