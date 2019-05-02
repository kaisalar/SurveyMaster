const express = require('express')
const router = express.Router()
const _ = require('lodash')
// const { Survey, validateSurvey } = require('../models/survey')
const Survey = require('../models/survey')
const Response = require('../models/response')


// @route  Get api/surveys
// @desc   Get All Surveys
// @access Public
router.get('/', async (req, res) => {
    const surveys = await Survey.loadSurveys()
    res.send(surveys)
})

// @route  Get api/surveys/:id
// @desc   Get Survey by his/her id
// @access Public
router.get('/:id', async (req, res) => {
    const _id = req.params.id

    const exist = await Survey.isExsisit(_id)
    if (!exist) {
        return res.status(404).send(`The survey with the given id: ${_id} NOT FOUND.`)
    }

    const survey = await Survey.loadSurveyToFiliingById(_id)

    res.send(survey)
})

// @route  Get api/surveys/:id/responses
// @desc   Get All responses For Survey by surveyId
// @access Public
router.get('/:id/responses', async (req, res) => {
    const _id = req.params.id

    // Validate if the survey with this _id exist?
    const exist = await Survey.isExsisit(_id)
    if (!exist) {
        return res.status(404).send(`The survey with the given id: ${_id} NOT FOUND.`)
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

    const exist = await Survey.isExsisit(surveyId)
    if (!exist) {
        return res.status(404).send(`The survey with the given id: ${surveyId} NOT FOUND.`)
    }

    const response = await Response.loadSurveyResponsesInfo(surveyId, responseId)

    res.send(response)
})

// @route  Get api/surveys/:id/report
// @desc   Get report For Survey by surveyId
// @access Public
router.get('/:id/report', async (req, res) => {
    const _id = req.params.id

    const exist = await Survey.isExsisit(_id)
    if (!exist) {
        return res.status(404).send(`The survey with the given id: ${_id} NOT FOUND.`)
    }

    const report = Survey.generatReport(_id)

    res.send(report)
})

// @route  Post api/surveys
// @desc   Post a Survey
// @access Public
router.post('/', async (req, res) => {
    // Validation 
    const { error } = Survey.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // Create survey
    const survey = new Survey({
        ...req.body
    })

    // Save survey to DB
    await survey.save()

    res.send(_.pick(survey, ['_id', 'date', 'link']))
})

// @route  Delete api/surveys/:id
// @desc   Delete a Survey by id
// @access (Admin)
router.delete('/:id', async (req, res) => {
    const _id = req.params.id

    const exist = await Survey.isExsisit(_id)
    if (!exist) {
        return res.status(404).send(`The survey with the given id: ${_id} NOT FOUND.`)
    }

    // Delete survey 
    const survey = Survey.remove(_id)
    
    res.send(`Survey with id: ${_id} have been removed.`)
})

module.exports = router