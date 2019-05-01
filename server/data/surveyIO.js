const _ = require('lodash')
const { saveJson, loadJson, getFiles, exists } = require('./dataUtils')

const SURVEYS_PATH   = 'data/db/surveys'
const RESPONSES_PATH = 'data/db/surveys/responses'
const PAGES_PATH     = 'data/db/surveys/pages'
const ANSWERS_PATH   = 'data/db/surveys/responses/answers'

class SurveyIO {
    /// pages section ///
    
    // saving all pages in survey 
    static async saveSurveyPages(survey) {
        const data = _.pick(survey, ['pages'])
        await saveJson(`${PAGES_PATH}/${survey._id}.json`, data)
    }
    // loading all pages in survey by id of the survey 
    static async loadSurveyPagesById(surveyId) {
        return await readJson(`${PAGES_PATH}/${surveyId}.json`)
    }

    /// response section  ///

    // saving one response info 
    static async saveResponseInfo(response) {
        // here we assuming survey ID in the response 
        if(!response.surveyId) throw Error('cant save response without survey id');

        // getting all response data (just info)
        const oldResponses = await readJson(`${RESPONSES_PATH}/${response.surveyId}`);

        // adding the new response info
        const data = [...oldResponses,_.pick(response, ['_id','surveyId','date'])];

        await saveJson(`${RESPONSES_PATH}/${response.surveyId}.json`, data);
    }
    
    // saving one response answers 
    static async saveResponseAnswers(response) {
        const data = _.pick(response, ['answers']);
        await saveJson(`${ANSWERS_PATH}/${response._id}.json`, data);
    }
    // saving one entire response 
    static async saveEntireResponse(response){
        await SurveyIO.saveResponseInfo(response);
        await SurveyIO.saveResponseAnswers(response);
    }
    // i think we dont need this function 
    static async saveSurveyResponses(survey){
        const data = _.pick(survey,['responses']);
        data.forEach(response => {
            SurveyIO.saveEntireResponse(response);
        });
    }

    // loading all responses info to survey By servey Id 
    static async loadSurveyResponsesInfoById(surveyId){
        return await loadJson(`${RESPONSES_PATH}/${surveyId}.json`);
    }
    // loading one specific response info to survey By servey Id & response Id
    static async loadResponseInfoById(surveyId, responseId){
        const responses = SurveyIO.loadResponsesInfoByID(surveyId);
        return responses.find(response => response._id === responseId);
    }
    // loading answers for one specific response by response id 
    static loadResponseAnswersById(responseId){
        return await loadJson(`${ANSWERS_PATH}/${responseId}.json`);
    }
    // loading one entire response by survey id and response id 
    static loadEntirResponseById(surveyId, responseId){
        const info = await SurveyIO.loadResponseInfoById(surveyId, responseId);
        const answers = await SurveyIO.loadResponseAnswersById(responseId);
        return {...info, answers};
    }
    // loading all responses to Sruvey by survey id 
    // to use it in reports :3
    static loadSurveyResponsesById(surveyId){
        const responses = await SurveyIO.loadResponsesInfoByID(surveyId);
        responses.forEach(response => {
            response = SurveyIO.loadEntirResponseById(response._id);
        });
        return responses;
    }

    /// survey section ///     
    // saving survey info 
    static async saveSurveyInfo(survey) {
        const data = _.pick(survey, ['_id', 'title', 'date', 'link', 'description']);
        await saveJson(`${SURVEYS_PATH}/${survey._id}.json`, data);
    }
    // saving a new survey
    // for saving info and pages of the survey 
    static async saveNewSurvey(survey){
        await saveSurveyInfo(survey);
        await saveSurveyPages(survey);
    }
    // saving every thing in the survey 
    static async saveEntireSurvey(survey) {
        await SurveyIO.saveSurveyInfo(survey)
        await SurveyIO.saveSurveyPages(survey)
        await SurveyIO.saveSurveyResponses(survey)
    }

    // loading survey info for specific survey by survey id
    static async loadSurveyInfoById(surveyId) {
        return await loadJson(`${SURVEYS_PATH}/${surveyId}.json`)
    }
    // loading survey info and pages so the user can fill it 
    static async loadSurveyToFiliingById(surveyId){
        const info  = await loadSurveyInfoById(surveyId);
        const pages = await loadSurveyPagesById()
        return {...info, pages};
    }
    // laoad every thing in the survey 
    static async loadEntireSurvey(surveyId) {
        const info      = await SurveyIO.loadSuveyInfoById(surveyId)
        const responses = await SurveyIO.loadSurveyResponsesById(surveyId)
        const pages     = await SurveyIO.loadSurveyPagesByID(surveyId)
        return { ...info, responses, pages }
    }
    static async isSurveyExists(surveyId){
        return exists(`${SURVEYS_PATH}/${surveyId}.json`);
    }
    static async getSurveys(query) {
        const surveys = []
        const files = await getFiles(SURVEYS_PATH)
        for (const file of files) {
            const survey = await loadJson(file)
            let isAccept = true
            for (const key in query) {
                if (survey.hasOwnProperty(key)) {
                    if (survey[key] !== query[key])
                        isAccept = false;
                }
            }
            if (isAccept)
                surveys.push(survey)
        }
        return surveys
    }
}

module.exports = SurveyIO