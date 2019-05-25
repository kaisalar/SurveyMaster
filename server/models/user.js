const _ = require('lodash')
const jwt = require('jsonwebtoken')
const { jwtPrivateKey } = require('../config')
const Joi = require('joi')
const Element = require('./element')
const Survey = require('./survey')
const { userSchema } = require('./validationSchemas')
const IO = require('../data/IO')
const roles = require('./roles')

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

  async getSurveysInfo() {
    const surveysIds = this.surveys.map(s => s.surveyId)
    const surveys = []
    for (const id of surveysIds) {
      const survey = await IO.loadSurveyInfoById(id)
      surveys.push(new Survey(survey))
    }
    return surveys
  }

  hasSurvey(surveyId) {
    for (const survey of this.surveys) {
      if (survey.surveyId === surveyId) return true
    }
    return false
  }

  isAdminOnSurvey(surveyId) {
    for (const survey of surveys) {
      if (survey.surveyId === surveyId && survey.role === roles.ROLE_ADMIN)
        return true
    }
    return false
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
