const _ = require('lodash')
const {
  saveJson,
  loadJson,
  getFiles,
  exists,
  removeFile
} = require('./dataUtils')

const SURVEYS_PATH = 'data/db/surveys'
const RESPONSES_PATH = 'data/db/surveys/responses'
const PAGES_PATH = 'data/db/surveys/pages'
const ANSWERS_PATH = 'data/db/surveys/responses/answers'
const USERS_PATH = 'data/db/users'

class IO {
  /// pages section ///

  // saving all pages in survey
  static async saveSurveyPages(survey) {
    await saveJson(`${PAGES_PATH}/${survey._id}.json`, survey.pages)
  }
  // loading all pages in survey by id of the survey
  static async loadSurveyPagesById(surveyId) {
    return await loadJson(`${PAGES_PATH}/${surveyId}.json`)
  }

  /// response section  ///

  // saving one response info
  static async saveResponseInfo(response) {
    // here we assuming survey ID in the response
    if (!response.surveyId) throw Error('cant save response without survey id')

    // getting all response data (just info)
    let oldResponses = await loadJson(
      `${RESPONSES_PATH}/${response.surveyId}.json`
    )
    if (!oldResponses) oldResponses = []
    // adding the new response info
    const data = [
      ...oldResponses,
      _.pick(response, ['_id', 'surveyId', 'date'])
    ]

    await saveJson(`${RESPONSES_PATH}/${response.surveyId}.json`, data)
  }

  // saving one response answers
  static async saveResponseAnswers(response) {
    await saveJson(`${ANSWERS_PATH}/${response._id}.json`, response.answers)
  }
  // saving one entire response
  static async saveEntireResponse(response) {
    await IO.saveResponseInfo(response)
    await IO.saveResponseAnswers(response)
  }
  // i think we dont need this function
  static async saveSurveyResponses(survey) {
    survey.responses.forEach(response => {
      IO.saveEntireResponse(response)
    })
  }

  // loading all responses info to survey By servey Id
  static async loadSurveyResponsesInfoById(surveyId) {
    return await loadJson(`${RESPONSES_PATH}/${surveyId}.json`)
  }
  // loading one specific response info to survey By servey Id & response Id
  static async loadResponseInfoById(surveyId, responseId) {
    const responses = await IO.loadSurveyResponsesInfoById(surveyId)
    return responses.find(response => response._id == responseId)
  }
  // loading answers for one specific response by response id
  static async loadResponseAnswersById(responseId) {
    return await loadJson(`${ANSWERS_PATH}/${responseId}.json`)
  }
  // loading one entire response by survey id and response id
  static async loadEntirResponseById(surveyId, responseId) {
    const info = await IO.loadResponseInfoById(surveyId, responseId)
    const answers = await IO.loadResponseAnswersById(responseId)
    return { ...info, answers }
  }
  // loading all responses to Sruvey by survey id
  // to use it in reports :3
  static async loadSurveyResponsesById(surveyId) {
    const responsesInfo = await this.loadSurveyResponsesInfoById(surveyId)
    let responses = []
    for (let response of responsesInfo) {
      responses.push(await this.loadEntirResponseById(surveyId, response._id))
    }
    return responses
  }

  /// survey section ///
  // saving survey info
  static async saveSurveyInfo(survey) {
    const data = _.pick(survey, [
      '_id',
      'title',
      'color',
      'date',
      'link',
      'description',
      'users'
    ])
    await saveJson(`${SURVEYS_PATH}/${survey._id}.json`, data)
  }
  // saving a new survey
  // for saving info and pages of the survey
  static async saveNewSurvey(survey) {
    await IO.saveSurveyInfo(survey)
    await IO.saveSurveyPages(survey)
  }
  // saving every thing in the survey
  static async saveEntireSurvey(survey) {
    await IO.saveSurveyInfo(survey)
    await IO.saveSurveyPages(survey)
    await IO.saveSurveyResponses(survey)
  }

  // loading survey info for specific survey by survey id
  static async loadSurveyInfoById(surveyId) {
    return await loadJson(`${SURVEYS_PATH}/${surveyId}.json`)
  }

  // loading survey info and pages so the user can fill it
  static async loadSurveyToFiliingById(surveyId) {
    const info = await IO.loadSurveyInfoById(surveyId)
    const pages = await IO.loadSurveyPagesById(surveyId)
    return { ...info, pages }
  }
  // laoad every thing in the survey
  static async loadEntireSurvey(surveyId) {
    const info = await IO.loadSurveyInfoById(surveyId)
    const responses = await IO.loadSurveyResponsesById(surveyId)
    const pages = await IO.loadSurveyPagesById(surveyId)
    return { ...info, responses, pages }
  }
  static async isSurveyExists(surveyId) {
    return exists(`${SURVEYS_PATH}/${surveyId}.json`)
  }
  static async getSurveys(query) {
    const surveys = []
    const files = await getFiles(SURVEYS_PATH)
    for (const file of files) {
      const survey = await loadJson(file)
      let isAccept = true
      for (const key in query) {
        if (survey.hasOwnProperty(key)) {
          if (survey[key] !== query[key]) isAccept = false
        }
      }
      if (isAccept) surveys.push(survey)
    }
    return surveys
  }
  // remove Info of The Survey By survey Id
  static async removeSurveyInfoById(surveyId) {
    await removeFile(`${SURVEYS_PATH}/${surveyId}.json`)
  }
  // remove Survey Pages of Survey Bu Sutvey Id
  static async removeSurveyPagesById(surveyId) {
    await removeFile(`${PAGES_PATH}/${surveyId}.json`)
  }
  static async removeSurveyById(surveyId) {
    await this.removeSurveyInfoById(surveyId)
    await this.removeSurveyPagesById(surveyId)
  }
  static async removeSurveyResponsesInfoById(surveyId) {
    await removeFile(`${RESPONSES_PATH}/${surveyId}.json`)
  }

  /// users section ///
  // saving user
  static async saveUser(user) {
    await saveJson(`${USERS_PATH}/${user._id}.json`, user)
    let accounts = await loadJson(`${USERS_PATH}/accounts.json`)
    if (!accounts || !_.isArray(accounts)) accounts = []
    accounts.push({
      userId: user._id,
      email: user.email
    })
    await saveJson(`${USERS_PATH}/accounts.json`, accounts)
  }

  // load user by id
  static async findUserById(userId) {
    return await loadJson(`${USERS_PATH}/${userId}.json`)
  }

  // load user by email
  static async findUserByEmail(userEmail) {
    const accounts = await loadJson(`${USERS_PATH}/accounts.json`)
    if (accounts) {
      const account = accounts.find(a => a.email == userEmail)
      if (account) return IO.findUserById(account.userId)
    }
    // const files = await getFiles(USERS_PATH)
    // for (const file of files) {
    //   const user = await loadJson(file)
    //   if (user.email === userEmail) {
    //     return user
    //   }
    // }
  }
}
async function test() {
  // you can test what ever you want here ^_^
  // const surveys = await getFiles(SURVEYS_PATH);
  const ss = await IO.loadSurveyResponsesInfoById('12')
  console.log(ss)
}
//test();
module.exports = IO
