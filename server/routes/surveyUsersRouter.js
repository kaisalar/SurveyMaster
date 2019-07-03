const _ = require('lodash')
const express = require('express')
const Survey = require('../models/survey');
const User = require('../models/user');
const router = express.Router()
const auth = require('../middlewares/authorization');
const creator = require('../middlewares/creator');

// @route  get api/surveyUsers
// @desc   get all users of specfic survey
// @access Private
router.get('/:sid', auth, async (req, res) => {
    const surveyID = req.params.sid;
    if (! await Survey.isExists(surveyID)) {
        return res
            .status(404)
            .send(`The survey with the given id: ${surveyId} NOT FOUND.`);
    }

    const survey = await Survey.loadSurveyInfoById(surveyID);
    if (!survey.users) {
        return res
            .status(404)
            .send(`The survey with the given id: ${surveyId} NOT FOUND.`);
    }
    res.send(survey.users);
})

// @route  post api/surveyUsers/:id
// @desc   post new user for survey
// @access Private, admin
router.post('/:sid', [auth, admin], async (req, res) => {
    try {
        const surveyID = req.params.sid;
        const addedUser = req.body;
        if (!Survey.isExists(surveyID)) {
            return res
                .status(404)
                .send(`The survey with the given id: ${surveyId} NOT FOUND.`);
        }
        const survey = await Survey.loadSurveyInfoById(surveyID);
        if (!survey.users) {
            return res
                .status(404)
                .send(`The survey with the given id: ${surveyId} NOT FOUND.`);
        }
        if (!survey.hasUser(userId)) {
            return res
                .status(404)
                .send(`The user has no permission`);
        }
        const user = await User.findByEmail(addedUser.email);
        if (!user) {
            return res
                .status(404)
                .send(`user with email: ${addedUser.email} not`);
        }
        if (!user.hasSurvey(surveyID)) {
            return res
                .status(404)
                .send(`The user has no permission`);
        }
        user.deleteSurveyById(surveyID);
        survey.deleteUserById(userID);
        user.save();
        survey.save();
        res.send(user);
    } catch (e) {
        res.send(400).send("bad conniction try Again later");
    }
})

// @route  delete api/surveyUsers/:id
// @desc   delete some user from the survey
// @access private, admin
router.delete('/:sid/uid', [auth, creator], async (req, res) => {
    const surveyID = req.params.sid;
    const userID = req.params.uid;
    if (!Survey.isExists(surveyID)) {
        return res
            .status(404)
            .send(`The survey with the given id: ${surveyId} NOT FOUND.`);
    }
    const survey = await Survey.loadSurveyInfoById(surveyID);
    if (!survey.users) {
        return res
            .status(404)
            .send(`The survey with the given id: ${surveyId} NOT FOUND.`);
    }
    const user = await User.findByEmail(addedUser.email);
    if (!user) {
        return res
            .status(404)
            .send(`user with not found`);
    }
    user.addSurvey(survey, addedUser.role);
    survey.addUser(user, addedUser.role);
    user.save();
    survey.save();
    res.send(user);
})


module.exports = router
