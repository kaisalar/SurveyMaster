const express = require('express')
const router = express.Router()
const _ = require('lodash')
const User = require('../models/user')
const Survey = require('../models/survey')
const Response = require('../models/response')
const { getErrorMessages } = require('../models/validationSchemas')
const auth = require('../middlewares/authorization')
const roles = require('../models/roles')

// @route  Get api/surveys
// @desc   Get All Surveys
// @access Public
router.get('/', auth, async (req, res) => {
  // load user depending on the token in the auth middleware
  const user = await User.findById(req.user._id)

  // load that user's surveys
  const surveys = await user.getSurveysInfo()

  // send the surveys
  res.send(surveys)
})

// @route  Get api/surveys/:id
// @desc   Get Survey by his/her id
// @access Public
router.get('/:id', auth, async (req, res) => {
  const _id = req.params.id

  const user = await User.findById(req.user._id)

  if (!user.hasSurvey(_id))
    return res
      .status(404)
      .send(`The survey with the given id: ${_id} NOT FOUND.`)

  const survey = await Survey.loadSurveyToFiliingById(_id)

  res.send(survey)
})

// @route  Get api/surveys/:id/responses
// @desc   Get All responses For Survey by surveyId
// @access Public
router.get('/:id/responses', async (req, res) => {
  const _id = req.params.id

  // Validate if the survey with this _id exist?
  const exist = await Survey.isExists(_id)
  if (!exist) {
    return res
      .status(404)
      .send(`The survey with the given id: ${_id} NOT FOUND.`)
  }

  const responses = await Response.loadSurveyResponsesInfo(_id)

  res.send(responses)
})

// @route  Get api/surveys/:sid/responses/:rid
// @desc   Get response by surveyId, responseId
// @access Public
router.get('/:sid/responses/:rid', async (req, res) => {
  const surveyId = req.params.sid
  const responseId = req.params.rid

  const exist = await Survey.isExists(surveyId)
  if (!exist) {
    return res
      .status(404)
      .send(`The survey with the given id: ${surveyId} NOT FOUND.`)
  }

  const response = await Response.loadSurveyResponseById(surveyId, responseId)

  res.send(response)
})

// @route  Get api/surveys/:id/report
// @desc   Get report For Survey by surveyId
// @access Public
router.get('/:id/report', async (req, res) => {
  const _id = req.params.id

  const exist = await Survey.isExists(_id)
  if (!exist) {
    return res
      .status(404)
      .send(`The survey with the given id: ${_id} NOT FOUND.`)
  }

  const report = await Survey.generatReport(_id)

  res.send(report)
})

// @route  Post api/surveys
// @desc   Post a Survey
// @access Public
router.post('/', auth, async (req, res) => {
  // Validation
  const { error } = Survey.validate(req.body)
  if (error) {
    const message = getErrorMessages(error)
    return res.status(400).send(message)
  }

  // Create survey
  const survey = new Survey({
    ...req.body
  })

  const user = await User.findById(req.user._id)

  // Add the user to the survey
  survey.addUser(user, roles.ROLE_ADMIN)
  user.addSurvey(survey, roles.ROLE_ADMIN)

  // Save survey to DB
  await survey.save()
  await user.save()

  res.send(_.pick(survey, ['_id', 'date', 'link']))
})

// @route  Delete api/surveys/:id
// @desc   Delete a Survey by id
// @access (Admin)
router.delete('/:id', async (req, res) => {
  const _id = req.params.id

  const exist = await Survey.isExists(_id)
  if (!exist) {
    return res
      .status(404)
      .send(`The survey with the given id: ${_id} NOT FOUND.`)
  }

  // Delete survey
  const survey = Survey.remove(_id)

  res.send(`Survey with id: ${_id} have been removed.`)
})

module.exports = router
