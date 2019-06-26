const Joi = require('joi')
const types = require('./types')

const questionSchema = {
  title: Joi.string()
    .max(1024)
    .required(),
  description: Joi.string()
    .allow('')
    .max(1024)
    .optional()
}

const textQuestionSchema = {
  ...questionSchema,
  type: types.QUESTION_TEXT,
  content: Joi.object()
    .keys({
      placeHolder: Joi.string()
        .allow('')
        .max(255)
        .optional(),
      inputType: Joi.any()
        .valid(
          types.INPUT_TEXT,
          types.INPUT_NUMERIC,
          types.INPUT_PHONE_NUMBER,
          types.INPUT_EMAIL
        )
        .optional(),
      min: Joi.number()
        .positive()
        .optional(),
      max: Joi.number()
        .positive()
        .optional()
    })
    .required()
}

const paragraphQuestionSchema = {
  ...questionSchema,
  type: types.QUESTION_PARAGRAPH,
  content: Joi.object()
    .keys({
      placeHolder: Joi.string()
        .allow('')
        .max(255)
        .optional(),
      min: Joi.number()
        .positive()
        .optional(),
      max: Joi.number()
        .positive()
        .optional()
    })
    .required()
}

const multipleChoiceQuestionSchema = {
  ...questionSchema,
  content: Joi.object()
    .keys({
      choices: Joi.array()
        .items(Joi.string().required())
        .required()
    })
    .required()
}


const radioGroupQuestionSchema = {
  ...multipleChoiceQuestionSchema,
  type: types.QUESTION_RADIO_GROUP
}

const checkBoxQuestionSchema = {
  ...multipleChoiceQuestionSchema,
  type: types.QUESTION_CHECKBOX
}

const dropDownQuestionSchema = {
  ...multipleChoiceQuestionSchema,
  type: types.QUESTION_DROPDOWN
}

const sliderQuestionSchema = {
  ...questionSchema,
  type: types.QUESTION_SLIDER,
  content: Joi.object()
    .keys({
      min: Joi.number().required(),
      max: Joi.number().required(),
      minLabel: Joi.string()
        .allow('')
        .max(50)
        .optional(),
      maxLabel: Joi.string()
        .allow('')
        .max(50)
        .optional(),
      defaultValue: Joi.number().optional(),
      step: Joi.number()
        .positive()
        .optional()
    })
    .required()
}

const ratingQuestionSchema = {
  ...questionSchema,
  type: types.QUESTION_RATING,
  content: Joi.object()
    .keys({
      ratingType: Joi.any()
        .valid(types.RATING_NUMBERS, types.RATING_STARS)
        .optional(),
      min: Joi.number()
        .positive()
        .optional(),
      max: Joi.number()
        .positive()
        .optional(),
      minLabel: Joi.string()
        .allow('')
        .max(50)
        .optional(),
      maxLabel: Joi.string()
        .allow('')
        .max(50)
        .optional(),
      defaultValue: Joi.number()
        .positive()
        .optional()
    })
    .required()
}

const rangeQuestionSchema = {
  ...questionSchema,
  type: types.QUESTION_RANGE,
  content: Joi.object()
    .keys({
      min: Joi.number().required(),
      max: Joi.number().required(),
      minLabel: Joi.string()
        .allow('')
        .max(50)
        .optional(),
      maxLabel: Joi.string()
        .allow('')
        .max(50)
        .optional(),
      minDefaultValue: Joi.number().optional(),
      maxDefaultValue: Joi.number().optional(),
      step: Joi.number()
        .positive()
        .optional()
    })
    .required()
}
const fileUploadQuestionSchema = {
  ...questionSchema,
  type: types.QUESTION_UPLOADFILE
}
const Questions = {
  textQuestionSchema: textQuestionSchema,
  paragraphQuestionSchema: paragraphQuestionSchema,
  radioGroupQuestionSchema: radioGroupQuestionSchema,
  checkBoxQuestionSchema: checkBoxQuestionSchema,
  dropDownQuestionSchema: dropDownQuestionSchema,
  sliderQuestionSchema: sliderQuestionSchema,
  ratingQuestionSchema: ratingQuestionSchema,
  rangeQuestionSchema: rangeQuestionSchema,
  fileUploadQuestionSchema: fileUploadQuestionSchema
}

const answerSchema = {
  questionId: Joi.string()
    .uuid({ version: 'uuidv4' })
    .required()
}

const textAnswerSchema = {
  ...answerSchema,
  type: types.ANSWER_TEXT,
  content: Joi.object()
    .keys({
      value: Joi.string().optional().allow('')
    })
    .required()
}

const multipleChoiceAnswerSchema = {
  ...answerSchema,
  type: types.ANSWER_MULTIPLE_CHOICE,
  content: Joi.object()
    .keys({
      choices: Joi.array().items(Joi.string()).optional()
    })
    .required()
}

const singleNumberValueAnswerSchema = {
  ...answerSchema,
  type: types.ANSWER_SINGLE_NUMBER_VALUE,
  content: Joi.object()
    .keys({
      value: Joi.number().optional()
    })
    .required()
}

const rangeAnswerSchema = {
  ...answerSchema,
  type: types.ANSWER_RANGE,
  content: Joi.object()
    .keys({
      minValue: Joi.number().optional(),
      maxValue: Joi.number().optional()
    })
    .required()
}
const fileBase64AnswerSchema = {
  ...answerSchema,
  type: types.ANSWER_File_Base64,
  content: Joi.object()
    .keys({
      value: Joi.string().base64().optional().allow(''),
    })
    .required()
}
const Answers = {
  textAnswerSchema: textAnswerSchema,
  multipleChoiceAnswerSchema: multipleChoiceAnswerSchema,
  singleNumberValueAnswerSchema: singleNumberValueAnswerSchema,
  rangeAnswerSchema: rangeAnswerSchema,
  fileBase64AnswerSchema: fileBase64AnswerSchema
}

const pageSchema = {
  title: Joi.string()
    .allow('')
    .max(1024)
    .optional(),
  description: Joi.string()
    .allow('')
    .max(1024)
    .optional(),
  questions: Joi.array()
    .items(
      textQuestionSchema,
      paragraphQuestionSchema,
      radioGroupQuestionSchema,
      checkBoxQuestionSchema,
      dropDownQuestionSchema,
      ratingQuestionSchema,
      sliderQuestionSchema,
      rangeQuestionSchema
    )
    .optional()
}

const responseSchema = {
  surveyId: Joi.string()
    .uuid({ version: 'uuidv4' })
    .required(),
  date: Joi.date().optional(),
  answers: Joi.array()
    .items(
      textAnswerSchema,
      multipleChoiceAnswerSchema,
      singleNumberValueAnswerSchema,
      rangeAnswerSchema
    )
    .required()
}

const surveySchema = {
  title: Joi.string()
    .max(1024)
    .required(),
  color: Joi.string()
    .hex()
    .optional(),
  description: Joi.string()
    .allow('')
    .max(1024)
    .optional(),
  date: Joi.date().optional(),
  link: Joi.string()
    .max(1024)
    .optional(),
  pages: Joi.array()
    .items(pageSchema)
    .required(),
  baseLanguage: Joi.string()
    .optional(),
    translatedLanguages:Joi.array()
    .items(Joi.object())
    .optional()
}

const userSchema = {
  firstName: Joi.string()
    .min(1)
    .max(50)
    .required(),
  lastName: Joi.string()
    .min(1)
    .max(50)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(8)
    .max(255)
    .required()
}

function getErrorMessages(error) {
  const messages = error.details.map(detail => detail.message)
  return messages
}

module.exports.Questions = Questions
module.exports.Answers = Answers
module.exports.pageSchema = pageSchema
module.exports.responseSchema = responseSchema
module.exports.surveySchema = surveySchema
module.exports.userSchema = userSchema
module.exports.getErrorMessages = getErrorMessages
