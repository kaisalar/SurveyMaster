const _ = require('lodash')
const Joi = require('joi')
const Element = require('./element')
const Page = require('./page')
const Response = require('./response')
const { surveySchema } = require('./validationSchemas')
const IO = require('../data/IO')
const types = require('./types')
const TextAnswer = require('./answers/textAnswer')
const MultipleChoiceAnswer = require('./answers/multipleChoiceAnswer')
const SingleNumberValueAnswer = require('./answers/singleNumberValueAnswer')
const User = require('./user');
const axios = require('axios');
const Language = require('./languages');

class Survey extends Element {
  constructor(props) {
    super(props)
    this.title = props.title || ''
    this.description = props.description || ''
    this.date = props.date || Date.now()
    this.link = props.link || `fill/${this._id}`
    this.color = props.color || '#6610f2'
    this.pages = []
    if (props.pages && _.isArray(props.pages)) {
      props.pages.forEach(p => {
        this.addPage(p)
      })
    }
    this.users = props.users || []
    /* each user = {
            userId: string,
            userEmail: string,
            role: string
        } */
  }

  // languages section 
  static allAvailableLanguages() {
    return Language.allAvailableLanguages();
  }

  translateSurvey(language, callback) {
    try {
      console.log('start translate', language);
      let translatedSurvey = new Survey(this);
      let c = 0;
      //survey info
      // title,des
      c += 2;
      for (const page of translatedSurvey.pages) {
        // title,des
        c += 2;
        for (const question of page.questions) {
          // question info 
          c += 2;
          // question content
          switch (question.type) {
            case types.QUESTION_CHECKBOX:
            case types.QUESTION_DROPDOWN:
            case types.QUESTION_RADIO_GROUP:
              c += question.content.choices.length;
              break;
            case types.QUESTION_RANGE:
            case types.QUESTION_RATING:
            case types.QUESTION_SLIDER:
              c += 2;
          }
        }
      }
      Language.translate(translatedSurvey.title, language.code, (word) => {
        translatedSurvey.title = word;
        c--;
        if (c == 0) {
          callback(translatedSurvey);
        }
      });
      Language.translate(translatedSurvey.description, language.code, (word) => {
        translatedSurvey.description = word;
        c--;
        if (c == 0) {
          callback(translatedSurvey);
        }
      });

      for (const page of translatedSurvey.pages) {

        // page info 
        Language.translate(page.title, language.code, (word) => {
          page.title = word;
          c--;
          if (c == 0) {
            callback(translatedSurvey);
          }
        });
        Language.translate(page.description, language.code, (word) => {
          page.description = word;
          c--;
          if (c == 0) {
            callback(translatedSurvey);
          }
        });

        for (const question of page.questions) {

          // question info 
          Language.translate(question.title, language.code, (word) => {
            question.title = word
            c--;
            if (c == 0) {
              callback(translatedSurvey);
            }
          });
          Language.translate(question.description, language.code, (word) => {
            translatedSurvey.description = word;
            c--;
            if (c == 0) {
              callback(translatedSurvey);
            }
          });
          // question content
          switch (question.type) {
            case types.QUESTION_CHECKBOX:
            case types.QUESTION_DROPDOWN:
            case types.QUESTION_RADIO_GROUP:
              for (let i = 0; i < question.content.choices.length; i++) {
                Language.translate(question.content.choices[i], language.code, (word) => {
                  question.content.choices[i] = word;
                  c--;
                  if (c == 0) {
                    callback(translatedSurvey);
                  }
                });
              }
              break;

            case types.QUESTION_RANGE:
            case types.QUESTION_RATING:
            case types.QUESTION_SLIDER:
              Language.translate(question.content.minLabel, language.code, (word) => {
                question.content.minLabel = word;
                c--;
                if (c == 0) {
                  callback(translatedSurvey);
                }
              });
              Language.translate(question.content.maxLabel, language.code, (word) => {
                question.content.maxLabel = word;
                c--;
                if (c == 0) {
                  callback(translatedSurvey);
                }
              });
          }
        }
      }
    } catch (e) {
      throw e;
    }

    // TODO: must save 
    //callback(translatedSurvey);
  }

  // pages section
  addPage(page) {
    if (!(page instanceof Page)) {
      page = new Page(page)
    }
    this.pages.push(page)
  }

  addUser(user, role) {
    this.users.push({
      userId: user._id,
      userEmail: user.email,
      role
    })
  }
  hasUser(userId) {
    for (const user of this.users) {
      if (user.userId === userId) return true
    }
    return false
  }
  deleteUserById(userId) {
    let id = this.users.findIndex((survey, index) => survey.surveyId == surveyId);
    this.surveys.splice(id, 1);
  }
  // saving survey info and pages
  async save() {
    await IO.saveNewSurvey(this)
  }

  // saving just survey Info
  async saveInfo() {
    await IO.saveSurveyInfo(this)
  }

  static async loadPages(surveyId) {
    return await IO.loadSurveyPagesById(surveyId)
  }

  async loadPages() {
    this.loadPages(this._id)
  }

  static async loadQustions(surveyId) {
    const pages = await Survey.loadPages(surveyId)
    const questions = []
    for (const page of pages) {
      for (const question of page.questions) questions.push(question)
    }
    return questions
  }

  async loadQustions() {
    this.loadQustions(this_id)
  }

  // load one survey to fill
  // loading info and pages
  static async loadSurveyToFiliingById(surveyId) {
    if (! await Survey.isExists(surveyId)) {
      throw new Error(`survey ${surveyId} not found`);
    }
    return new Survey(await IO.loadSurveyToFiliingById(surveyId))
  }

  // loading all survey
  // must used to loading survey for an specific user
  static async loadSurveys(query) {
    return await IO.getSurveys(query)
  }

  static async loadSurveyInfoById(surveyId) {
    return IO.loadSurveyInfoById(surveyId);
  }

  // check if an survey exsisit by its id
  static async isExists(surveyId) {
    return await IO.isSurveyExists(surveyId)
  }

  static async remove(surveyId) {
    await IO.removeSurveyById(surveyId)
  }

  async remove() {
    for (const simiuser of this.users) {
      let user = await User.findUserById(simiuser.userId);
      user.deleteSurveyById(this._id);
      await user.save();
    }
    await IO.removeSurveyById(this._id);
  }

  static async loadSurveyResponseById(surveyId, responseId) {
    let response = await Response.loadSurveyResponseById(surveyId, responseId);
    let surveyQuestions = await Survey.loadQustions(surveyId);
    const questions = {}
    // init tempReport whith needed valuse
    for (const question of surveyQuestions) questions[question._id] = question;

    for (const answer of response.answers) {
      answer.question = questions[answer.questionId];
    }
    return response;
  }

  async loadSurveyResponseById(responseId) {
    return await Survey.loadSurveyResponseById(this._id, responseId);
  }

  static async generatReport(surveyId) {
    // fetching all responses and questions for current survey
    const responses = await Response.loadSurveyResponses(surveyId)
    const questions = await Survey.loadQustions(surveyId)
    const tempReport = {}
    // init tempReport whith needed valuse
    for (const question of questions) {
      const { _id, content, type } = question
      tempReport[_id] = {}
      //console.log(question);
      switch (type) {
        // text and single value init in the response
        case types.QUESTION_CHECKBOX:
        case types.QUESTION_DROPDOWN:
        case types.QUESTION_RADIO_GROUP:
          for (const choice of content.choices) tempReport[_id][choice] = 0
          break
        case types.QUESTION_RANGE:
        case types.QUESTION_SLIDER:
        case types.QUESTION_RATING:
          //TODO: need to add step instead of 1
          for (let i = parseInt(content.min); i <= parseInt(content.max); i += 1) tempReport[_id][i] = 0
          break
      }
    }
    for (const response of responses) {
      for (const answer of response.answers) {
        //    console.log(answer);
        const { questionId, content, type } = answer
        switch (type) {
          case types.ANSWER_RANGE:
            // TODO need TO add Step instead of 1
            for (let i = content.minValue; i <= content.maxValue; i += 1)
              tempReport[questionId][i]++
            break
          case types.ANSWER_MULTIPLE_CHOICE:
            for (const choice of content.choices) tempReport[questionId][choice]++
            break

          // same content.value can be used here ^_^
          //case types.ANSWER_TEXT:
          //case types.ANSWER_SINGLE_NUMBER_VALUE:
          // or if dont have any type:
          default:
            if (!tempReport[questionId][content.value])
              tempReport[questionId][content.value] = 0
            tempReport[questionId][content.value]++
            break
        }
      }
    }
    let report = { surveyId: surveyId, answers: [] };

    for (const question of questions) {
      report.answers.push({ ...(_.pick(question, "_id", "type", "title", "description")), content: tempReport[question._id] });
    }
    return report
  }
  async generatReport() {
    await Survey.generatReport(this._id)
  }
  static validate(survey) {
    const result = Joi.validate(survey, surveySchema)
    return result
  }
  validate() {
    const result = Joi.validate(this, surveySchema)
    return result
  }
}

async function test() {
  // const report = await Survey.generatReport(
  //   '38bf2a5f-b1a8-478e-aa91-0b0d8469e103'
  // )
  // console.log(report)
}

// test();

module.exports = Survey
