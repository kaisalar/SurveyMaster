const express = require('express')
const router = express.Router()
const _ = require('lodash')
const Survey = require('../models/survey')
const Response = require('../models/response')

// @route  Get fill/:id
// @desc   Get Survey with this :id to fill it.
// @access Public
router.get('/:id', async (req, res) => {
    const _id = req.params.id

    // Validate if the survey with this _id exist?
    const exist = await Survey.isExsisit(_id)
    if (!exist) {
        return res.status(404).send(`The survey with the given id: ${_id} NOT FOUND.`)
    }

    // Read survey to fill from DB
    const survey = await Survey.loadSurveyToFiliingById(_id)

    res.send(survey)
})

// @route  Post fill/:id
// @desc   Post filled Survey with this :id.
// @access Public
router.post('/:id', async (req, res) => {
    const _id = req.params.id
    // Validate if the survey with this _id exist.
    const exist = await Survey.isExsisit(_id)
    if (!exist) {
        return res.status(404).send(`The survey with the given id: ${_id} NOT FOUND.`)
    }

    // validation on response
    const { error } = Response.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // const survey = await Survey.loadSurveyToFiliingById(_id)
    await Response.saveNewResponse(req.body)

    res.send(true)
})

module.exports = router