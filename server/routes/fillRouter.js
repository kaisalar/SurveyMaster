const express = require('express')
const router = express.Router()
const _ = require('lodash')
const Survey = require('../models/survey')
const Response = require('../models/response')
const { getErrorMessages } = require('../models/validationSchemas')
const Language = require('../models/languages')
// @route  Get fill/:id
// @desc   Get Survey with this :id to fill it.
// @access Public
router.get('/:id', async (req, res) => {
    const _id = req.params.id

    // Validate if the survey with this _id exist?
    const exist = await Survey.isExists(_id)
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
    const exist = await Survey.isExists(_id)
    if (!exist) {
        return res.status(404).send(`The survey with the given id: ${_id} NOT FOUND.`)
    }

    // validation on response
    const { error } = Response.validate(req.body)
    if (error) {
        const message = getErrorMessages(error)
        console.log(error)
        return res.status(400).send(message)
    }

    const response = new Response({
        ...req.body
    })

    // await Response.saveNewResponse(req.body)
    await response.save()

    res.send(_.pick(response, ['_id', 'surveyId', 'date']))
})

// @route  GET api/surveys/:id/languages
// @desc   get all available languages to translate
// @access (admin)
router.get("/languages", async (req, res) => {
    survey.translatedLanguages = [];

    survey.langs = Language.getAllAvailableLanguages();

    res.send(survey);
});

// @route  GET fill/:sid/languages/:lcode
// @desc   get
// @access (admin)
router.get("/:sid/languages/:lcode", async (req, res) => {
    const surveyId = req.params.sid;
    const languageCode = req.params.lcode;
    const language = Language.getLanguage(languageCode);

    if (!(await Survey.isExists(surveyId))) {
        return res
            .status(404)
            .send(`The survey with the given id: ${surveyId} NOT FOUND.`);
    }

    const survey = new Survey(await Survey.loadSurveyToFiliingById(surveyId));

    if (!survey)
        return res
            .status(404)
            .send(`The survey with the given id: ${surveyId} NOT FOUND.`);
    try {
        survey.translateSurvey(language, translatedSurvey => {
            res.send(translatedSurvey);
        });
    }
    catch (e) {
        console.log(e);
        res.status(400).send("can't translate to this language right now");
    }
});
module.exports = router