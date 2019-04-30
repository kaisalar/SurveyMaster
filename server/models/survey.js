const _ = require('lodash')
const Element = require('./element')
const Page = require('./page')
const Response = require('./response')
const SurveyIO = require('../data/surveyIO');
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
        this.responses = []
        if (props.responses && _.isArray(props.responses)) {
            props.responses.forEach(r => {
                this.addResponse(response)
            })
        }
    }

    addPage(page) {
        if (!page instanceof Page) {
            page = new Page(page)
        }
        this.pages.push(response)
    }

    addResponse(response) {
        if (!response instanceof Response) {
            response = new Response(response)
        }
        this.responses.push(response)
    }
    // saving survey info and pages 
    async save(){
        await SurveyIO.saveNewSurvey(this);
    }
    // saving just survey Info 
    async saveInfo(){
        await SurveyIO.saveSurveyInfo(this);
    }
    // load one survey to fill
    // loading info and pages
    async static loadSurveyToFiliingById(surveyId){
        return new Survey(await SurveyIO.loadSurveyToFiliingById(surveyId));
    }
    // loading all survey 
    // must used to loading survey for an specific user 
    async static loadSurveys(){
        return await SurveyIO.getSurveys();
    }
    // check if an survey exsisit by its id 
    async static isExsisit(surveyId){
        return await SurveyIO.isSurveyExists(surveyId);
    }
    // saving new Response
    async static saveNewResponse(response){
        await SurveyIO.saveEntireResponse(response);
    }
    // saving new Response Info
    async static saveResponseInfo(response){
        await SurveyIO.saveResponseInfo(response);
    }
    // loading all survey responses info  by sruvey Id
    async static loadSurveyResponsesInfo(surveyId){
        return await SurveyIO.loadSurveyResponsesInfoById(surveyId);
    }
    // loading all survey responses info to current Survey 
    async loadSurveyResponsesInfo(){
        return await SurveyIO.loadSurveyResponsesInfoById(this._id);
    }
    // loading entire one specific response By Surey Id and response Id
    async static loadSurveyResponseById(surveyId, responseId){
        return new Response(await SurveyIO.loadEntirResponseById(surveyId, responseId));
    }
    // loading entire one specific response to current Survey by response Id
    async loadSurveyResponseById(responseId){
        return new Response(await SurveyIO.loadEntirResponseById(this._id, responseId));
    }
    // loading all Responses to an Survey By survey Id 
    async static loadSurveyResponses(surveyId){ 
        return await SurveyIO.loadSurveyResponsesById(surveyId);
    }
    // loading all Responses to current Survey 
    async loadSurveyResponses(surveyId){ 
        return await SurveyIO.loadSurveyResponsesById(this._id);
    }
}

module.exports = Survey