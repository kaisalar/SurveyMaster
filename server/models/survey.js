const _ = require('lodash')
const Joi = require('joi')
const Element = require('./element')
const Page = require('./page')
const Response = require('./response')
const { surveySchema } = require('./validationSchemas')
const IO = require('../data/IO');
const types = require('./types');
const TextAnswer = require('./textAnswer');
const MultipleChoiceAnswer = require('./multipleChoiceAnswer');
const SingleNumberValueAnswer = require('./singleNumberValueAnswer');
console.log(IO);
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
    async save(){
        await IO.saveNewSurvey(this);
    }
    // saving just survey Info 
    async saveInfo(){
        await IO.saveSurveyInfo(this);
    }
    static async loadPages(surveyId){
        return await IO.loadSurveyPagesById(surveyId);
    }
    async loadPages(){
        this.loadPages(this._id);
    }
    static async loadQustions(surveyId){
        const pages = await Survey.loadPages(surveyId);
        const questions = [];
        for(const page of pages){
            for(const question of page.questions)questions.push(question);
        }
        return questions;
    }
    async loadQustions(){
        this.loadQustions(this_id);
    }
    // load one survey to fill
    // loading info and pages
    static async loadSurveyToFiliingById(surveyId){
        return new Survey(await IO.loadSurveyToFiliingById(surveyId));
    }
    // loading all survey 
    // must used to loading survey for an specific user 
    static async loadSurveys(){
        return await IO.getSurveys();
    }
    // check if an survey exsisit by its id 
    static async isExsisit(surveyId){
        return await IO.isSurveyExists(surveyId);
    }
    static async remove(surveyId){
        await IO.removeSurveyById(surveyId);
    }
    async remove(){
        await this.remove(this._id);
        return await SurveyIO.loadSugitgitrveyResponsesInfoById(surveyId);
    }
    static async  generatReport(surveyId){
        // fetching all responses and questions for current survey
        const responses = await Response.loadSurveyResponses(surveyId);
        const questions = await Survey.loadQustions(surveyId);
        const report = {};
        // init report whith needed valuse 
        /*
    QUESTION_RADIO_GROUP: 'QUESTION_RADIO_GROUP',
    QUESTION_CHECKBOX: 'QUESTION_CHECKBOX',
    QUESTION_DROPDOWN: 'QUESTION_DROPDOWN',
    QUESTION_SLIDER: 'QUESTION_SLIDER',
    QUESTION_RATING: 'QUESTION_RATING',
    QUESTION_RANGE: 'QUESTION_RANGE',
*/
        for(const question of questions){
            const {_id, content, type } = question;
            report[_id]={};
            //console.log(question);
            switch (type) {
                // text and single value init in the response
                case types.QUESTION_CHECKBOX:
                case types.QUESTION_DROPDOWN:
                case types.QUESTION_RADIO_GROUP:
                for(const choice of content.choices)
                    report[_id][choice]=0;
                    //TODO: need to add step instead of 1
                    break;
                case types.QUESTION_RANGE:
                case types.QUESTION_SLIDER:
                case types.QUESTION_RATING:
                    for(let i = content.min;i <= content.max;i += 1)
                        report[_id][i] = 0;
                    break;
            }
        }
        for(const response of responses){
            for(const answer of response.answers){
            //    console.log(answer);
                const {questionId, content, type} = answer;
                switch (type) {
                    case types.ANSWER_RANGE:
                        // TODO need TO add Step instead of 1
                        for(let i = content.minValue;i <= content.maxValue ; i+=1)
                            report[questionId][i]++;
                    break
                    case types.ANSWER_MULTIPLE_CHOICE:
                        for(const choice of content.choices)
                            report[questionId][choice]++;
                    break

                    // same content.value can be used here ^_^ 
                    //case types.ANSWER_TEXT:
                    //case types.ANSWER_SINGLE_NUMBER_VALUE:
                    // or if dont have any type:
                    default:   
                    if(!report[questionId][content.value])report[questionId][content.value] = 0;
                    report[questionId][content.value]++;
                    break
                }
            }
        }
        return report;
    }
    async generatReport() {
        await this.generatReport(this._id);
    }
    static validate(survey) {
        const result = Joi.validate(survey, surveySchema)
        return result
    }
    validate() {
        const result = Joi.validate(this, surveySchema)
        return result;
    }
}
async function test(){
    const report = await Survey.generatReport("823d09fe-2898-4ddc-8e6d-6a6a35d7b5a5");
    console.log(report);
}
test();
module.exports = Survey