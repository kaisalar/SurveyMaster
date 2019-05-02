const _ = require('lodash')
const Joi = require('joi')
const Element = require('./element')
const Page = require('./page')
const Response = require('./response')
const IO = require('../data/IO');
const { surveySchema } = require('./validationSchemas')

class Survey extends Element {
    constructor(props) {
        super(props)
        this.title = props.title || ''
        this.description = props.description || ''
        this.date = props.date || Date.now()
        this.link = props.link || ''
        this.pages = []
        if (props.pages && _.isArray(props.pages)) {
            props.pages.forEach(p => {
                this.addPage(p)
            });
        }
    }

    addPage(page) {
        if (!page instanceof Page) {
            page = new Page(page)
        }
        this.pages.push(page)
    }

    // saving survey info and pages 
    async save() {
        await IO.saveNewSurvey(this);
    }
    // saving just survey Info 
    async saveInfo() {
        await IO.saveSurveyInfo(this);
    }
    // load one survey to fill
    // loading info and pages
    static async loadSurveyToFiliingById(surveyId) {
        return new Survey(await IO.loadSurveyToFiliingById(surveyId));
    }
    // loading all survey 
    // must used to loading survey for an specific user 
    static async loadSurveys() {
        return await IO.getSurveys();
    }
    // check if an survey exsisit by its id 
    static async isExsisit(surveyId) {
        return await IO.isSurveyExists(surveyId);
    }
    static async generatReport(surveyId) {
        const response = await this.loadSurveyResponses(surveyId);
    }
    static async remove(surveyId) {
        await IO.removeSurveyById(surveyId);
    }
    async remove() {
        await this.remove(this._id);
        return await SurveyIO.loadSugitgitrveyResponsesInfoById(surveyId);
    }
    static async  generatReport(surveyId) {
        const response = await this.loadSurveyResponses(surveyId);
    }
    async generatReport() {
        this.generatReport(this._id);
    }
    static validate(survey) {
        const result = Joi.validate(survey, surveySchema)
        return result
    }
}

module.exports = Survey