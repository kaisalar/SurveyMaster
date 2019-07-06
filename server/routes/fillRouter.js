const express = require('express')
const router = express.Router()
const _ = require('lodash')
const Survey = require('../models/survey')
const Response = require('../models/response')
const { getErrorMessages } = require('../models/validationSchemas')
const Language = require('../models/languages')
const devDebugger = require('../debugger');
// @route  Get fill/:id
// @desc   Get Survey with this :id to fill it.
// @access Public
router.get('/:id', async (req, res) => {
    try {
        const surveyId = req.params.id
        devDebugger(`get to fill/${surveyId} with: `, req.body, req.params);
        // Validate if the survey with this surveyId exist?
        const exist = await Survey.isExists(surveyId)
        if (!exist) {
            devDebugger(`ERROR: The survey with the given id: ${surveyId} NOT FOUND.`)
            return res.status(404).send(`The survey with the given id: ${surveyId} NOT FOUND.`)
        }
        // Read survey to fill from DB
        const survey = await Survey.loadSurveyToFiliingById(surveyId)

        res.send(survey)
    } catch (e) {
        devDebugger("bad connection with error:", e);
        return res.status(400).send('bad connection.');
    }
})

// @route  Post fill/:id
// @desc   Post filled Survey with this :id.
// @access Public
router.post('/:id', async (req, res) => {
    try {
        const surveyId = req.params.id
        devDebugger(`post to fill/${surveyId} with: `, req.body, req.params);
        // Validate if the survey with this surveyId exist.
        const exist = await Survey.isExists(surveyId)
        if (!exist) {
            devDebugger(`ERROR: The survey with the given id: ${surveyId} NOT FOUND.`)
            return res.status(404).send(`The survey with the given id: ${surveyId} NOT FOUND.`)
        }

        // validation on response
        const { error } = Response.validate(req.body)
        if (error) {
            const message = getErrorMessages(error)
            devDebugger(`ERROR:`, message);
            return res.status(400).send(message)
        }

        const response = new Response({
            ...req.body
        })

        // await Response.saveNewResponse(req.body)
        await response.save()

        res.send(_.pick(response, ['_id', 'surveyId', 'date']))
    } catch (e) {
        devDebugger("bad connection with error:", e);
        return res.status(400).send('bad connection.');
    }
})

// @route  GET api/surveys/:id/languages
// @desc   get all available languages to translate
// @access (admin)
router.get("/languages", async (req, res) => {
    try {
        devDebugger(`post to fill/languages with: `, req.body);
        survey.translatedLanguages = [];

        survey.langs = Language.getAllAvailableLanguages();

        res.send(survey);
    }
    catch (e) {
        devDebugger("bad connection with error:", e);
        return res.status(400).send('bad connection.');
    }
});

// @route  GET fill/:sid/languages/:lcode
// @desc   get
// @access (admin)
router.get("/:sid/languages/:lcode", async (req, res) => {
    try {
        const surveyId = req.params.sid;
        const languageCode = req.params.lcode;
        const language = Language.getLanguage(languageCode);
        devDebugger(`post to fill/${surveyId}/languages/${languageCode} with: `, req.body, req.params);
        if (!(await Survey.isExists(surveyId))) {
            devDebugger(`ERROR: The survey with the given id: ${surveyId} NOT FOUND.`)
            return res
                .status(404)
                .send(`The survey with the given id: ${surveyId} NOT FOUND.`);
        }
        const survey = new Survey(await Survey.loadSurveyToFiliingById(surveyId));
        if (!survey) {
            devDebugger(`ERROR: The survey with the given id: ${surveyId} NOT FOUND.`)
            return res
                .status(404)
                .send(`The survey with the given id: ${surveyId} NOT FOUND.`);
        }
        try {
            survey.translateSurvey(language, translatedSurvey => {
                res.send(translatedSurvey);
            });
        }
        catch (e) {
            devDebugger("error on translate:", e);
            res.status(400).send("can't translate to this language right now");
        }
    } catch (e) {
        devDebugger("bad connection with error:", e);
        return res.status(400).send('bad connection.');
    }
});
module.exports = router