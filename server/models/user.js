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
    this.surveys = props.surveys || []
    /* each survey = {
      surveyId: string,
      surveyTitle: string,
      role: string
    } */
  }

  addSurvey(survey, role) {
    this.surveys.push({
      surveyId: survey._id,
      surveyTitle: survey.title,
      role
    })
  }

  generateAuthToken() {
    return jwt.sign(
      _.pick(this, ['_id', 'firstName', 'lastName', 'email']),
      jwtPrivateKey
    )
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

  static validate(user) {
    const result = Joi.validate(user, userSchema)
    return result
  }
}

module.exports = User
