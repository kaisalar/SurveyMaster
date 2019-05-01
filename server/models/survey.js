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
        this.pages.push(response)
    }

    // saving survey info and pages 
    async save(){
        await IO.saveNewSurvey(this);
    }
    // saving just survey Info 
    async saveInfo(){
        await IO.saveSurveyInfo(this);
    }
    // load one survey to fill
    // loading info and pages
    static async loadSurveyToFiliingById(surveyId){
        return new Survey(await IO.loadSurveyToFiliingById(surveyId));
    }
    // loading all survey 
    // must used to loading survey for an specific user 
<<<<<<< HEAD
    async static loadSurveys() {
        return await SurveyIO.getSurveys();
    }
    // check if an survey exsisit by its id 
    async static isExsisit(surveyId) {
        return await SurveyIO.isSurveyExists(surveyId);
    }
    // saving new Response
    async static saveNewResponse(response) {
        await SurveyIO.saveEntireResponse(response);
    }
    // saving new Response Info
    async static saveResponseInfo(response) {
        await SurveyIO.saveResponseInfo(response);
    }
    // loading all survey responses info  by sruvey Id
    async static loadSurveyResponsesInfo(surveyId) {
=======
    static async loadSurveys(){
        return await IO.getSurveys();
    }
    // check if an survey exsisit by its id 
    static async isExsisit(surveyId){
        return await IO.isSurveyExists(surveyId);
    }
<<<<<<< HEAD
    static async generatReport(surveyId){
        const response = await this.loadSurveyResponses(surveyId);
    }
    static async remove(surveyId){
        await IO.removeSurveyById(surveyId);
    }
    async remove(){
        await this.remove(this._id);
=======
    // saving new Response
    static async saveNewResponse(response){
        await SurveyIO.saveEntireResponse(response);
    }
    // saving new Response Info
    static async saveResponseInfo(response){
        await SurveyIO.saveResponseInfo(response);
    }
    // loading all survey responses info  by sruvey Id
    static async loadSurveyResponsesInfo(surveyId){
>>>>>>> 1756b62a21e0ef9c4c471228bb8a9cf275e5a381
        return await SurveyIO.loadSurveyResponsesInfoById(surveyId);
    }
    // loading all survey responses info to current Survey 
    async loadSurveyResponsesInfo() {
        return await this.loadSurveyResponsesInfo(this._id);
    }
    // loading entire one specific response By Surey Id and response Id
<<<<<<< HEAD
    async static loadSurveyResponseById(surveyId, responseId) {
=======
    static async loadSurveyResponseById(surveyId, responseId){
>>>>>>> 1756b62a21e0ef9c4c471228bb8a9cf275e5a381
        return new Response(await SurveyIO.loadEntirResponseById(surveyId, responseId));
    }
    // loading entire one specific response to current Survey by response Id
    async loadSurveyResponseById(responseId) {
        return await this.loadSurveyResponseById(this._id, responseId);
    }
    // loading all Responses to an Survey By survey Id 
<<<<<<< HEAD
    async static loadSurveyResponses(surveyId) {
=======
    static async loadSurveyResponses(surveyId){ 
>>>>>>> 1756b62a21e0ef9c4c471228bb8a9cf275e5a381
        return await SurveyIO.loadSurveyResponsesById(surveyId);
    }
    // loading all Responses to current Survey 
    async loadSurveyResponses() {
        return await this.loadSurveyResponses(this._id);
    }
<<<<<<< HEAD
    async static generatReport(surveyId) {

=======
    static async  generatReport(surveyId){
        const response = await this.loadSurveyResponses(surveyId);
        
>>>>>>> 1756b62a21e0ef9c4c471228bb8a9cf275e5a381
>>>>>>> 47a15bdb048d403e87e7578a86f0731a554594d2
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