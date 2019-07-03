const _ = require('lodash')
const Joi = require('joi')
const Element = require('./element')
const Answer = require('./answers/answer')
const TextAnswer = require('./answers/textAnswer')
const MultipleChoiceAnswer = require('./answers/multipleChoiceAnswer')
const SingleNumberValueAnswer = require('./answers/singleNumberValueAnswer')
const RangeAnswer = require('./answers/rangeAnswer')
const types = require('./types')
const { responseSchema } = require('./validationSchemas')
const IO = require('../data/IO');


class Response extends Element {
    constructor(props) {
        super(props)
        this.surveyId = props.surveyId
        this.date = props.date || Date.now()
        this.answers = [];
        if (props.answers && _.isArray(props.answers)) {
            props.answers.forEach(a => {
                this.addAnswer(a)
            });
        }
    }

    addAnswer(answer) {
        if (answer instanceof Answer) {
            this.answers.push(answer)
            return
        }

        switch (answer.type) {
            case types.ANSWER_TEXT:
                answer = new TextAnswer(answer)
                break

            case types.ANSWER_MULTIPLE_CHOICE:
                answer = new MultipleChoiceAnswer(answer)
                break

            case types.ANSWER_SINGLE_NUMBER_VALUE:
                answer = new SingleNumberValueAnswer(answer)
                break

            case types.ANSWER_RANGE:
                answer = new RangeAnswer(answer)
                break
        }

        if (answer instanceof Answer) {
            this.answers.push(answer)
        }
    }
    // saving new Response
    static async saveNewResponse(response) {
        await IO.saveEntireResponse(response);
    }
    async save() {
        await Response.saveNewResponse(this);
    }
    // saving new Response Info
    static async saveResponseInfo(response) {
        await IO.saveResponseInfo(response);
    }
    // loading all survey responses info  by sruvey Id
    static async loadSurveyResponsesInfo(surveyId) {
        return await IO.loadSurveyResponsesInfoById(surveyId);
    }
    // loading all survey responses info to current Survey 
    async loadSurveyResponsesInfo() {
        return await this.loadSurveyResponsesInfo(this._id);
    }
    // loading entire one specific response By Surey Id and response Id
    static async loadSurveyResponseById(surveyId, responseId) {
        return new Response(await IO.loadEntirResponseById(surveyId, responseId));
    }
    // loading entire one specific response to current Survey by response Id
    async loadSurveyResponseById(responseId) {
        return await this.loadSurveyResponseById(this._id, responseId);
    }
    // loading all Responses to an Survey By survey Id 
    static async loadSurveyResponses(surveyId) {
        return await IO.loadSurveyResponsesById(surveyId);
    }
    // loading all Responses to current Survey 
    async loadSurveyResponses() {
        return await this.loadSurveyResponses(this._id);
    }
    static validate(response) {
        console.log(response);
        const result = Joi.validate(response, responseSchema)
        return result
    }
}

module.exports = Response